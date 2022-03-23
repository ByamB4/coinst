#!/usr/bin/env python3
from requests import *
from functools import partial
from collections import OrderedDict
import socket

prt = partial(print, flush=True)
answers = socket.getaddrinfo('sapi.coinhub.mn', 443)
(family, type, proto, canonname, (address, port)) = answers[0]

print(address)

USERS = [
    {
        'phone': '80136164',
        'id': 'db3a4486cd8b4ea6bd43'
    }
]


class Coinst:
    ENDPOINT: str = 'https://sapi.coinhub.mn'
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
        'Referer': 'https://www.coinhub.mn/',
        'Origin': 'https://www.coinhub.mn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': "sapi.coinhub.mn",
    }
    TOKEN: str = '6cf0ff1405d849a58420605d1ed566cc'
    USERID: str = USERS[0]['id']

    SESSION = Session()

    def __init__(self):
        self.SESSION.headers = self.HEADERS
        self.anything()

    def login(self):
        resp = post(f'https://{address}//v1/user/login',
                    data=f'item=97680136164&channel=coinhub-prd&password=e01cf6b6050d53795ed9de7f7ff3b108', verify=False)
        prt(resp.request.body, resp)

    def anything(self):
        resp = post(f'https://sapi.coinhub.mn//v1/init',
                    data='userid=db3a4486cd8b4ea6bd43&token=36d8a8b281664866ac37f78a7e974a0a&channel=coinhub-prd', verify=False)

        prt(resp)


if __name__ == '__main__':
    Coinst()
