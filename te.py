import requests

burp0_url = "https://sapi.coinhub.mn:443//v1/init?userid=db3a4486cd8b4ea6bd43&token=36d8a8b281664866ac37f78a7e974a0a&channel=coinhub-prd"
burp0_headers = {"Connection": "close", "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36"}
a = requests.get(burp0_url, headers=burp0_headers)

print(a)
