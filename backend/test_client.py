import requests
import json

base_url = 'http://localhost:4000'

header = {'Content-Type': 'application/json'}

data = {
    'email': 'gaaaggsqqqssssssss',
    'name': 'Hello',
    'last_name': 'Hello',
    'password': 'Hello',
}

res = requests.post(
    url=base_url+'/signup',
    headers=header,
    data=json.dumps(data)
)

print(res.json())