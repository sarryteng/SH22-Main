import unittest
from unittest.mock import patch
from getTyreData import get_tyre_data

class TestGetTyreData(unittest.TestCase):

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
            result = get_tyre_data("AO12XZP")
            self.assertTrue(result["success"])
            self.assertEqual(result["status_code"], 200)
            self.assertEqual(result["message"], "API Call succeeded. Data available.")
            self.assertEqual(result["data"]["vrm"], "AO12XZP")
            self.assertEqual(result["data"]["make"], "AUDI")
            self.assertEqual(result["data"]["model"], "A6 ALLROAD TDI QUATTRO A")
            self.assertEqual(len(result["data"]["frontTyres"]), 1)
            self.assertEqual(len(result["data"]["rearTyres"]), 1)
            self.assertEqual(len(result["data"]["bothTyres"]), 0)

if __name__ == '__main__':
    unittest.main()
