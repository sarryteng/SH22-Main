import json
import requests

carDataDwell = {
    'hook': {
        'target': 'http://localhost:8000/url-data',
        'id': 'camera-1',
        'event': 'dwell_time'
    },
    'data': {
        'camera_id': 'camera-1',
        'timestamp': '2024-02-17T22:42:15.980405Z',
        'timestamp_local': '2024-02-17 22:42:15.980405+00:00',
        'results': {
            'plate': 'de57ugk',
            'first_seen': '2024-02-17 22:42:00.492907+00:00',
            'dwell_time': 0.0,
            'last_seen': '2024-02-17 22:42:00.492907+00:00',
            'user_data': ''
        }
    }
}

data = json.dumps(carDataDwell)
requests.post("http://localhost:8000/url-data", data={"json": data})