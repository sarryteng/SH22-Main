# fake data to stimulate data received from Platerecognizer
#       - dscore is 0.421 (lower than threshold) -> represents exit

import json
import requests

carData ={
    'hook': {
        'target': 'http://localhost:8000/url-data',
        'id': 'camera-1',
        'event': 'recognition',
        'filename': 'camera-1_screenshots/24-02-17/22-42-00.492907.jpg'
    },
    'data': {
        'camera_id': 'camera-1',
        'filename': 'camera-1_screenshots/24-02-17/22-42-00.492907.jpg',
        'timestamp': '2024-02-17T22:42:00.492907Z',
        'timestamp_local': '2024-02-17 22:42:00.492907+00:00',
        'results': [
            {
                'box': {
                    'xmin': 124,
                    'ymin': 356,
                    'xmax': 216,
                    'ymax': 386
                },
                'plate': 'de57ugk',
                'region': {
                    'code': 'gb',
                    'score': 0.582
                },
                'score': 0.9,
                'candidates': [
                    {
                        'score': 0.9,
                        'plate': 'de57ugk'
                    }
                ],
                'dscore': 0.421,
                'vehicle': {
                    'score': 0.407,
                    'type': 'Big Truck',
                    'box': {
                        'xmin': 71,
                        'ymin': 13,
                        'xmax': 405,
                        'ymax': 420
                    }
                },
                'direction': '',
                'source_url': 'rtsp://localhost:8554/stream1',
                'position_sec': '1280.089939925',
                'user_data': ''
            }
        ]
    }
}

data = json.dumps(carData)
requests.post("http://localhost:8000/url-data", data={"json": data})