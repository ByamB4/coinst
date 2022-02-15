from flask import Flask, jsonify
import os
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import time
import tzlocal


OBJECT_ENDPOINT = 'https://blabla.cdn.com'
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


def fetchStories():

    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))


scheduler = BackgroundScheduler(daemon=True, timezone=tzlocal.get_localzone())
scheduler.add_job(fetchStories, trigger="interval", seconds=10)
scheduler.start()

atexit.register(lambda: scheduler.shutdown())

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index() -> str:
    return jsonify({
        'status': 'ok',
        'message': 'We prioritize user data so dont use it wrong way',
    })


@app.route("/themunkhjin/stories", methods=["GET"])
def munkhjinStories() -> str:
    res = []
    for file in os.listdir(f'{STATIC_ROOT}/themunkhjin'):
        res.append({
            'date': file.split('|')[0],
            'type': file.endswith('mp4') and 'video' or 'image',
            'url': f'{OBJECT_ENDPOINT}/{file}'
        })

    return jsonify({
        'status': 'ok',
        'data': res,
    })


@app.route("/trader.erkhemee/stories", methods=["GET"])
def erkhemeeStories() -> str:
    res = []
    for file in os.listdir(f'{STATIC_ROOT}/trader.erkhemee'):
        res.append({
            'date': file.split('|')[0],
            'type': file.endswith('mp4') and 'video' or 'image',
            'url': f'{OBJECT_ENDPOINT}/{file}'
        })

    return jsonify({
        'status': 'ok',
        'data': res,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001, debug=True, use_reloader=False)
