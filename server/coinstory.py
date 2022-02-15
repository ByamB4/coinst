from ctypes.wintypes import BOOLEAN
from xmlrpc.client import Boolean
import instaloader
import os
import boto3


class CoinstStory:
    INST = None
    S3 = None
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
    BUCKET_NAME: str = 'coinst-story'
    LOG: bool = True

    def __init__(self):
        self.initInstLoader()
        self.initS3()
        if self.LOG:
            print('[+] Initialized values')

        self.fetchStories()

    def initInstLoader(self) -> None:
        self.INST = instaloader.Instaloader()
        self.INST.load_session_from_file('byamb4.bot')

    def initS3(self) -> None:
        self.S3 = boto3.client('s3')

    def fetchStories(self) -> None:
        os.chdir(self.STATIC_ROOT)
        for stories in self.INST.get_stories([user.get('id') for user in self.TARGET_USERS]):
            USERNAME: str = stories.owner_username
            FILENAMES = self.getDirObjects(USERNAME, self.S3.list_objects(
                Bucket=self.BUCKET_NAME, Prefix=f'{USERNAME}/'))
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

                        self.S3.upload_file(
                            f'{USERNAME}/{FILENAME}.jpg',
                            f'coinst-story',
                            f'{USERNAME}/{FILENAME}.jpg'
                        )
                        os.remove(f'{USERNAME}/{FILENAME}.jpg')

                    elif story.typename == 'GraphStoryVideo':
                        os.rename(f'{USERNAME}/{OUTNAME}.mp4',
                                  f'{USERNAME}/{FILENAME}.mp4')

                        self.S3.upload_file(
                            f'{USERNAME}/{FILENAME}.mp4',
                            f'coinst-story',
                            f'{USERNAME}/{FILENAME}.mp4'
                        )
                        os.remove(f'{USERNAME}/{FILENAME}.mp4')

                        os.rename(f'{USERNAME}/{OUTNAME}.jpg',
                                  f'{USERNAME}/{FILENAME}.jpg')

                        self.S3.upload_file(
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

    def getDirObjects(self, USERNAME, LISTED_OBJECTS) -> any:
        return [object.get('Key')[len(f'{USERNAME}/'):] for object in LISTED_OBJECTS.get('Contents')]

    def getStoryIDS(self, FILENAMES) -> any:
        # print(FILENAMES)
        # print([_.split('|')[1] for _ in FILENAMES[1:]])
        # input()
        return [_.split('|')[1] for _ in FILENAMES[1:]]


if __name__ == '__main__':
    CoinstStory()
