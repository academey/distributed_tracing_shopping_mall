#! /usr/bin/python3
import os
from time import sleep

SEARCH_API = f'{os.getenv("SEARCH_HOST", "localhost")}:{os.getenv("SEARCH_PORT", "8001")}'

def make_request(endpoint):
    print("--------------------------------------------------------")
    print(f'GET {endpoint}')
    curl_result = f'curl {endpoint}'
    response = os.popen(curl_result).read()
    print(response)
    sleep(0.1)

while 1:
    make_request(SEARCH_API + "/search")
    print("\n")