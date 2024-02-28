import unittest
from unittest.mock import patch
import json

from backendServices import app

class TestFlaskApp(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_get_tyre_data_success(self):
        with patch('backendServices.getTyreData.get_tyre_data') as mock_get_tyre_data:
            mock_get_tyre_data.return_value = {
                "success": True,
                "status_code": 200,
                "data": {
                    "tyre_info": "some tyre info"
                }
            }
            response = self.app.get('/tyre-data/A012XZP')
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 200)
            self.assertTrue(data['success'])
            self.assertEqual(data['status_code'], 200)
            self.assertIn('tyre_info', data['data'])

    def test_get_tyre_data_failure(self):
        with patch('backendServices.getTyreData.get_tyre_data') as mock_get_tyre_data:
            mock_get_tyre_data.side_effect = Exception("Some error occurred")
            response = self.app.get('/tyre-data/Z000ABC')
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 500)
            self.assertFalse(data['success'])
            self.assertEqual(data['status_code'], 500)
            self.assertIn('An error is encountered', data['message'])

if __name__ == '__main__':
    unittest.main()
