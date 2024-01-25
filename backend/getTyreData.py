import requests
import re

API_PORTAL: str = "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM"
PARAM_NAME: str = "VehicleNumberPlate"

# request header
REQUEST_TIMEOUT = 5  # time in seconds until the request stops

TEST_PLATE = "AO12XZP"


class APIRequestFailed(Exception):
    def __init__(self, code: int = -1, response: requests.Response = requests.Response()):
        super().__init__("API Call to Tyrerunner did not receive proper response.")
        self.err_code = code
        self.response = response


def get_tyre_data(vehicle_num: str, api_key='', api_portal=API_PORTAL, param_name=PARAM_NAME, timeout=REQUEST_TIMEOUT) -> dict:
    if not isinstance(vehicle_num, str):
        raise TypeError(f"vehicle_num must be a python str, received [{type(vehicle_num)}]")
    re.sub(r"\s+", "", vehicle_num)  # trim all whitespaces

    req_hdr: dict[str, str] = {'Ocp-Apim-Subscription-Key': api_key}
    # API Call
    try:
        get: requests.Response = requests.get(f"{api_portal}?{param_name}={vehicle_num}",
                                              headers=req_hdr,
                                              timeout=timeout)

    except Exception as e:
        print("Error in API call.")
        raise e

    if get.status_code != 200:
        raise APIRequestFailed(get.status_code, get)

    return get.json()


if __name__ == "__main__":
    print(requests.get("http://127.0.0.1:6767/tyre-data/" + TEST_PLATE).json())


