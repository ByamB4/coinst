from flask import Flask, jsonify
import instaloader
import atexit
import tzlocal
import os
import boto3
from apscheduler.schedulers.background import BackgroundScheduler
import time


S3 = boto3.client('s3')
BUCKET_NAME: str = 'coinst-story'


def getDirObjects(USERNAME, LISTED_OBJECTS) -> any:
    return [object.get('Key')[len(f'{USERNAME}/'):] for object in LISTED_OBJECTS.get('Contents')][1:]


class CoinstStory:
    INST = None
    TARGET_USERS = [
        {
            'name': 'themunkhjin',
            'id': '10803123624',
            'new_stories': 0
        },
        {
            'name': 'trader.erkhemee',
            'id': '7417135025',
            'new_stories': 0
        }
    ]
    STATIC_ROOT: str = 'static'
    LOG: bool = True

    def __init__(self):
        self.start()

    def start(self):
        print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))
        self.initInstLoader()

        if self.LOG:
            print('[+] Initialized values')

        self.fetchStories()

    def initInstLoader(self) -> None:
        self.INST = instaloader.Instaloader()
        self.INST.load_session_from_file('byamb4.bot')

    def fetchStories(self) -> None:
        os.chdir(self.STATIC_ROOT)
        for stories in self.INST.get_stories([user.get('id') for user in self.TARGET_USERS]):
            USERNAME: str = stories.owner_username
            FILENAMES = getDirObjects(USERNAME, S3.list_objects(
                Bucket=BUCKET_NAME, Prefix=f'{USERNAME}/'))
            STORYIDS = self.getStoryIDS(FILENAMES)

            if self.LOG:
                print(f'[+] {USERNAME}')

            NEW_STORY_COUNT: int = 0
            for story in stories.get_items():
                if not str(story.mediaid) in STORYIDS:
                    NEW_STORY_COUNT += 1
                    FILENAME: str = f'{story.date_local}|{story.mediaid}|{story.typename}'
                    OUTNAME: str = str(story.date).replace(
                        ' ', '_').replace(':', '-') + '_UTC'
                    self.INST.download_storyitem(story, USERNAME)

                    if story.typename == 'GraphStoryImage':
                        os.rename(f'{USERNAME}/{OUTNAME}.jpg',
                                  f'{USERNAME}/{FILENAME}.jpg')

                        S3.upload_file(
                            f'{USERNAME}/{FILENAME}.jpg',
                            f'coinst-story',
                            f'{USERNAME}/{FILENAME}.jpg'
                        )
                        os.remove(f'{USERNAME}/{FILENAME}.jpg')

                    elif story.typename == 'GraphStoryVideo':
                        os.rename(f'{USERNAME}/{OUTNAME}.mp4',
                                  f'{USERNAME}/{FILENAME}.mp4')

                        S3.upload_file(
                            f'{USERNAME}/{FILENAME}.mp4',
                            f'coinst-story',
                            f'{USERNAME}/{FILENAME}.mp4'
                        )
                        os.remove(f'{USERNAME}/{FILENAME}.mp4')

                        os.rename(f'{USERNAME}/{OUTNAME}.jpg',
                                  f'{USERNAME}/{FILENAME}.jpg')

                        S3.upload_file(
                            f'{USERNAME}/{FILENAME}.jpg',
                            f'coinst-story',
                            f'{USERNAME}/{FILENAME}.jpg'
                        )
                        os.remove(f'{USERNAME}/{FILENAME}.jpg')

                    os.remove(f'{USERNAME}/{OUTNAME}.json.xz')

            targetUserIndex = [
                user.get('name') for user in self.TARGET_USERS].index(USERNAME)
            self.TARGET_USERS[targetUserIndex]['new_stories'] += NEW_STORY_COUNT
            if self.LOG:
                print(
                    f'\t[+] New story count {self.TARGET_USERS[targetUserIndex]["new_stories"]}')

        os.chdir('..')

    def getStoryIDS(self, FILENAMES) -> any:
        return [_.split('|')[1] for _ in FILENAMES]


app = Flask(__name__)


@app.route("/", methods=["GET"])
def index() -> str:
    return jsonify({
        'status': 'ok',
        'message': 'We prioritize user data so dont use it wrong way',
    })


@app.route("/themunkhjin/stories", methods=["GET"])
def munkhjinStories() -> str:
    USERNAME: str = 'themunkhjin'
    RESULT = []
    FILENAMES = getDirObjects(USERNAME, S3.list_objects(
        Bucket=BUCKET_NAME, Prefix=f'{USERNAME}/'))

    for file in FILENAMES:
        RESULT.append({
            'date': file.split('|')[0],
            'type': file.endswith('mp4') and 'video' or 'image',
            'url': f'https://coinst-story.s3.us-east-2.amazonaws.com/themunkhjin/{file}'
        })

    return jsonify({
        'status': 'ok',
        'data': RESULT,
    })


@app.route("/trader.erkhemee/stories", methods=["GET"])
def erkhemeeStories() -> str:
    USERNAME: str = 'trader.erkhemee'
    RESULT = []
    FILENAMES = getDirObjects(USERNAME, S3.list_objects(
        Bucket=BUCKET_NAME, Prefix=f'{USERNAME}/'))

    for file in FILENAMES:
        RESULT.append({
            'date': file.split('|')[0],
            'type': file.endswith('mp4') and 'video' or 'image',
            'url': f'https://coinst-story.s3.us-east-2.amazonaws.com/trader.erkhemee/{file}'
        })

    return jsonify({
        'status': 'ok',
        'data': RESULT,
    })


if __name__ == '__main__':
    coinst = CoinstStory()
    scheduler = BackgroundScheduler(
        daemon=True, timezone=tzlocal.get_localzone())
    scheduler.add_job(coinst.start, 'interval', seconds=30)
    scheduler.start()
    atexit.register(lambda: scheduler.shutdown())

    # Flask
    app.run(host='0.0.0.0', port=9001, debug=True, use_reloader=False)
