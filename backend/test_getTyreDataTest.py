import unittest
from unittest.mock import patch, MagicMock

import requests

from getTyreData import get_tyre_data
from backendServices import *
class TestGetTyreData(unittest.TestCase):
    @patch('backendServices.os.path.isfile', return_value=False)
    @patch('configparser.ConfigParser')
    def test_create_config(self, mock_configparser, mock_path_isfile):
        mock_config = MagicMock()
        mock_config.get.return_value = {
            "TyreRunner API": {
                "api_portal": "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM",
                "param_name": "VehicleNumberPlate",
                "api_key": ""
            }
        }
        mock_configparser.return_value = mock_config

        main()


    def test_valid_plate(self):
        with patch('getTyreData.requests.get') as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {
                "vrm": "AO12XZP",
                "make": "AUDI",
                "model": "A6 ALLROAD TDI QUATTRO A",
                "tyreOptionsWithPressure": [
                    {
                        "tyreType": "FRONT",
                        "width": 235,
                        "ratio": 55,
                        "rim": 18,
                        "loadIndex": "100",
                        "speedIndex": "Y",
                        "pressure": {
                            "bar": 2.3,
                            "psi": 33,
                            "laden": {
                                "bar": 2.3,
                                "psi": 33
                            }
                        }
                    },
                    {
                        "tyreType": "REAR",
                        "width": 235,
                        "ratio": 55,
                        "rim": 18,
                        "loadIndex": "100",
                        "speedIndex": "Y",
                        "pressure": {
                            "bar": 2.1,
                            "psi": 30,
                            "laden": {
                                "bar": 2.1,
                                "psi": 30
                            }
                        }
                    }
                ]
            }
            result,_ = get_tyre_data("AO12XZP")
            self.assertTrue(result["success"])
            self.assertEqual(result["status_code"], 200)
            self.assertEqual(result["message"], "API Call succeeded. Data available.")
            self.assertEqual(result["data"]["vrm"], "AO12XZP")
            self.assertEqual(result["data"]["make"], "AUDI")
            self.assertEqual(result["data"]["model"], "A6 ALLROAD TDI QUATTRO A")
            self.assertEqual(len(result["data"]["frontTyres"]), 1)
            self.assertEqual(len(result["data"]["rearTyres"]), 1)
            self.assertEqual(len(result["data"]["bothTyres"]), 0)

    def test_invalid_plate_format(self):
        # Test handling of invalid plate format
        invalid_plates = ["Z000ABC"]
        for plate in invalid_plates:
            with patch('getTyreData.requests.get') as mock_get:
                mock_get.return_value.status_code = 400
                mock_get.return_value.json.return_value = {
                    "success": False,
                "status_code": 400,
                "message": "Plate number does not follow a valid format. AA00AAA",
                # "data": {
                #     "error": "Plate number does not follow a valid format. AA00AAA",
                # }
                }
                result, _ = get_tyre_data(plate)


                self.assertFalse(result["success"])
                self.assertEqual(result["status_code"], 400)
                self.assertEqual(result["message"], "Bad request to Tyrerunner API.")
    def test_api_response_error_handling(self):
        # Test handling of different API response status codes
        with patch('getTyreData.requests.get') as mock_get:
            # Simulate 400 Bad Request
            mock_get.return_value.status_code = 400
            mock_get.return_value.json.return_value = {"error": "Bad request"}
            result,_ = get_tyre_data("AO12XZP")
            self.assertFalse(result["success"])
            self.assertEqual(result["status_code"], 400)
            self.assertEqual(result["message"], "Bad request to Tyrerunner API.")

            # Simulate 401 Unauthorized
            mock_get.return_value.status_code = 401
            mock_get.return_value.text = "Unauthorized access"
            result,_ = get_tyre_data("AO12XZP")
            self.assertFalse(result["success"])
            self.assertEqual(result["status_code"], 401)
            self.assertEqual(result["message"],
                             "Access denied from Tyrerunner. Check your subscription key in 'config.ini' file.")

            # Simulate 404 Not Found
            mock_get.return_value.status_code = 404
            result,_ = get_tyre_data("AO12XZP")
            self.assertFalse(result["success"])
            self.assertEqual(result["status_code"], 404)
            self.assertEqual(result["message"], "Tyrerunner API cannot find the data on the plate number.")

            # Simulate 500 Internal Server Error
            mock_get.return_value.status_code = 500
            result,_ = get_tyre_data("AO12XZP")
            
            self.assertFalse(result["success"])
            self.assertEqual(result["status_code"], 500)
            self.assertEqual(result["message"], "There is an internal server error from Tyrerunner API. (Check the plate numbers)")

    def test_request_timeout_handling(self):
        # Test handling of request timeout
        with patch('getTyreData.requests.get') as mock_get:
            mock_get.side_effect = requests.exceptions.Timeout
            result,_ = get_tyre_data("AO12XZP")
            self.assertFalse(result["success"])
            self.assertEqual(result["status_code"], 500)
            self.assertEqual(result["message"], "API call from backend to Tyrerunner ran into an exception.")


if __name__ == '__main__':
    unittest.main()
