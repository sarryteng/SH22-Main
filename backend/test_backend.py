import configparser
import unittest
from unittest.mock import patch
import json

from backendServices import *
# from getTyreData import get_tyre_data
from backendServices import get_tyre_data
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(__file__), 'config.ini')
config.read('../config.ini')

API_PORTAL = config.get("TyreRunner API", "api_portal")
PARAM_NAME = config.get("TyreRunner API", "param_name")
API_KEY = config.get("TyreRunner API", "api_key")
class TestFlaskApp(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        config = configparser.ConfigParser()
        config.read('../config.ini')
        cls.api_key = config.get('TyreRunner API', 'api_key')
    def setUp(self):
        # app.config['TESTING'] = True
        # self.app = app.test_client()
        self.app = app.test_client()
        self.app.testing = True
        

    def tearDown(self):
        pass

    def test_get_tyre_data_success(self):
        with patch('backendServices.getTyreData.get_tyre_data') as mock_get_tyre_data:
            mock_get_tyre_data.return_value = {
               "data": {
        "bothTyres": [],
        "frontTyres": [{
            "ladenBar": 2.3,
            "ladenOption": False,
            "ladenPSI": 33,
            "loadIndex": "100",
            "markings": "235/55 18 100Y",
            "normalBar": 2.3,
            "normalPSI": 33,
            "ratio": 55,
            "rim": 18,
            "speedIndex": "Y",
            "tyreType": "FRONT",
            "width": 235
        }],
        "make": "AUDI",
        "model": "A6 ALLROAD TDI QUATTRO A",
        "rearTyres": [{
            "ladenBar": 2.1,
            "ladenOption": False,
            "ladenPSI": 30,
            "loadIndex": "100",
            "markings": "235/55 18 100Y",
            "normalBar": 2.1,
            "normalPSI": 30,
            "ratio": 55,
            "rim": 18,
            "speedIndex": "Y",
            "tyreType": "REAR",
            "width": 235
        }],
        "vrm": "AO12XZP"
    },
    "message": "API Call succeeded. Data available.",
    "status_code": 200,
    "success": True
            }
         
            
            response, status_code = get_tyre_data("A012XZP")
            print(status_code)
            self.assertTrue(response['success'])
            self.assertEqual(status_code, 200)
            self.assertEqual(response['message'], "API Call succeeded. Data available.")


            self.assertIn('data', response)
            self.assertIn('bothTyres', response['data'])
            self.assertIn('frontTyres', response['data'])
            self.assertIn('rearTyres', response['data'])
            self.assertIn('make', response['data'])
            self.assertIn('model', response['data'])
            self.assertIn('vrm', response['data'])



            front_tyres = response['data']['frontTyres']
            front_tyre = front_tyres[0]
            self.assertEqual(front_tyre['ladenBar'], 2.3)
            self.assertEqual(front_tyre['ladenOption'], False)
            self.assertEqual(front_tyre['ladenPSI'], 33)
            self.assertEqual(front_tyre['loadIndex'], "100")
            self.assertEqual(front_tyre['markings'], "235/55 18 100Y")
            self.assertEqual(front_tyre['normalBar'], 2.3)
            self.assertEqual(front_tyre['normalPSI'], 33)
            self.assertEqual(front_tyre['ratio'], 55)
            self.assertEqual(front_tyre['rim'], 18)
            self.assertEqual(front_tyre['speedIndex'], "Y")
            self.assertEqual(front_tyre['tyreType'], "FRONT")
            self.assertEqual(front_tyre['width'], 235)
            
            rear_tyres = response['data']['rearTyres']
            rear_tyre = rear_tyres[0]
            self.assertEqual(rear_tyre['ladenBar'], 2.1)
            self.assertEqual(rear_tyre['ladenOption'], False)
            self.assertEqual(rear_tyre['ladenPSI'], 30)
            self.assertEqual(rear_tyre['loadIndex'], "100")
            self.assertEqual(rear_tyre['markings'], "235/55 18 100Y")
            self.assertEqual(rear_tyre['normalBar'], 2.1)
            self.assertEqual(rear_tyre['normalPSI'], 30)
            self.assertEqual(rear_tyre['ratio'], 55)
            self.assertEqual(rear_tyre['rim'], 18)
            self.assertEqual(rear_tyre['speedIndex'], "Y")
            self.assertEqual(rear_tyre['tyreType'], "REAR")
            self.assertEqual(rear_tyre['width'], 235)

            self.assertEqual(response['data']['make'], "AUDI")
            self.assertEqual(response['data']['model'], "A6 ALLROAD TDI QUATTRO A")
                    
                    
            
       
           
            

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
    main()
    unittest.main()

