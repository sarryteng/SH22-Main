import requests
import re

API_PORTAL: str = "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM"
PARAM_NAME: str = "VehicleNumberPlate"

# request header
REQ_HDR: dict[str, str] = {'Ocp-Apim-Subscription-Key': 'f5b270f2f4ae43089d422938b9208119'}
REQUEST_TIMEOUT = 5  # time in seconds until the request stops

TEST_PLATE = "AO12XZP"


class APIRequestFailed(Exception):
    def __init__(self, code: int = -1, response: requests.Response = requests.Response()):
        super().__init__("API Call to Tyrerunner did not receive proper response.")
        self.err_code = code
        self.response = response


def get_tyre_data(vehicle_num: str) -> dict:
    if not isinstance(vehicle_num, str):
        raise TypeError(f"vehicle_num must be a python str, received [{type(vehicle_num)}]")
    re.sub(r"\s+", "", vehicle_num)  # trim all whitespaces

    # API Call
    try:
        get: requests.Response = requests.get(f"{API_PORTAL}?{PARAM_NAME}={vehicle_num}",
                                              headers=REQ_HDR,
                                              timeout=REQUEST_TIMEOUT)

    except Exception as e:
        print("Error in API call.")
        raise e

    if get.status_code != 200:
        raise APIRequestFailed(get.status_code, get)

    return get.json()


if __name__ == "__main__":
    print(requests.get("http://127.0.0.1:6767/tyre-data/" + TEST_PLATE).json())


