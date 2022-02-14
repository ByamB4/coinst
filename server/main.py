import instaloader
import os

L = instaloader.Instaloader()

L.load_session_from_file('byamb4.bot')

STATIC_ROOT = 'static'

users = [
    {
        'name': 'themunkhjin',
        'id': '10803123624',
    },
    {
        'name': 'trader.erkhemee',
        'id': '7417135025'
    }
]

# Instaloader can't work with relative path so have to change cwd
os.chdir(STATIC_ROOT)

for stories in L.get_stories(
    [_['id'] for _ in users]
):
    USERNAME: str = stories.owner_username
    print(f'[+] {USERNAME}')
    for story in stories.get_items():
        fileIDS = []
        [fileIDS.append(_.split('|')[1])
         for _ in os.listdir(USERNAME)]
        fileName = f'{story.date_local}|{story.mediaid}|{story.typename}'
        if not str(story.mediaid) in fileIDS:
            L.download_storyitem(
                story, USERNAME)
            downloadFileName = str(story.date).replace(
                ' ', '_').replace(':', '-') + '_UTC'
            if story.typename == 'GraphStoryImage':
                os.rename(f'{USERNAME}/{downloadFileName}.jpg',
                          f'{USERNAME}/{fileName}.jpg')
            elif story.typename == 'GraphStoryVideo':
                os.rename(f'{USERNAME}/{downloadFileName}.mp4',
                          f'{USERNAME}/{fileName}.mp4')
                os.rename(f'{USERNAME}/{downloadFileName}.jpg',
                          f'{USERNAME}/{fileName}.jpg')
            os.remove(f'{USERNAME}/{downloadFileName}.json.xz')

os.chdir('..')
