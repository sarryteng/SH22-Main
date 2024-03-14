import traceback
import requests
import re

API_PORTAL: str = "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM"
PARAM_NAME: str = "VehicleNumberPlate"

# request header
REQUEST_TIMEOUT = 5  # time in seconds until the request stops

TEST_PLATE = "AO12XZP"
BAD_PLATE = "Z000ABC"

# API CALL MESSAGES
SUCCESS_200 = "API Call succeeded. Data available."
BAD_REQUEST_400 = "Bad request to Tyrerunner API."
BAD_PLATE_400 = "Plate number does not follow a valid format. AA00AAA"
BAD_KEY_401 = "Access denied from Tyrerunner. Check your subscription key in 'config.ini' file."
NOT_FOUND_404 = "Tyrerunner API cannot find the data on the plate number."
API_CALL_ERROR_500 = "API call from backend to Tyrerunner ran into an exception."
API_INTERNAL_ERROR_500 = "There is an internal server error from Tyrerunner API. (Check the plate numbers)"

# plate regex
UK_PLATE_REGEX = r"(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)"

# format json in this format
# {
#   success: True/False
#   status_code: int
#   message: string
#   data: {}
# }

# data format is as follows
# {
#  "data": {
#     "vrm": string
#     "make": string
#     "model": string
#     "frontTyres": [list of tyres],
#     "rearTyres": [list of tyres],
#     "bothTyres": [list of tyres]
#  }}

# tyre data format
#  {
#      "tyreType": string,
#      "marking
#      "width": int,
#      "ratio": int,
#      "rim": int,
#      "loadIndex": string,
#      "speedIndex": string,
#      "markings": string,
#      "ladenOption": boolean,
#      "normalBar": int,
#      "normalPSI": int,
#      "ladenBar": int,
#      "ladenPSI": int
#  }


def get_tyre_data(vehicle_num: str, api_key='', api_portal=API_PORTAL, param_name=PARAM_NAME,
                  timeout=REQUEST_TIMEOUT) -> dict:
    if not isinstance(vehicle_num, str):
        raise TypeError(f"vehicle_num must be a python str, received [{type(vehicle_num)}]")

    re.sub(r"\s+", "", vehicle_num)  # trim all whitespaces

    if not re.match(UK_PLATE_REGEX, vehicle_num):
        # plate number does not match regex
        return {"success": False,
                "status_code": 400,
                "message": BAD_PLATE_400,
                "data": {
                    "error": vehicle_num
                }}

    req_hdr: dict[str, str] = {'Ocp-Apim-Subscription-Key': api_key}
    # API Call
    try:
        get: requests.Response = requests.get(f"{api_portal}?{param_name}={vehicle_num}",
                                              headers=req_hdr,
                                              timeout=timeout)

    except Exception as e:
        # Error in API call
        return {"success": False,
                "status_code": 500,
                "message": API_CALL_ERROR_500,
                "data": {
                    "error": str(e) + "\n\n" + traceback.format_exc()
                }}

    status_code = get.status_code

    if status_code == 200:
        # success
        get_json = get.json()

        # separate tyres to FRONT, BACK, BOTH
        tyres = get_json["tyreOptionsWithPressure"]
        tyre_types = {"FRONT": [],
                      "REAR": [],
                      "BOTH": []}
        for tyre_choice in tyres:
            if tyre_choice["tyreType"] not in tyre_types:
                tyre_types[tyre_choice["tyreType"]] = list()

            # check laden option
            if not tyre_choice["pressure"]["laden"]:  # if no heavyweight choice
                laden_bar = tyre_choice["pressure"]["bar"]
                laden_psi = tyre_choice["pressure"]["psi"]
                laden_option = False
            else:  # there is heavy load (laden) option
                laden_bar = tyre_choice["pressure"]["laden"]["bar"]
                laden_psi = tyre_choice["pressure"]["laden"]["psi"]
                laden_option = True

            # construct tyre marking
            markings = (str(tyre_choice["width"]) + "/" + str(tyre_choice["ratio"]) + "  R  " + str(tyre_choice["rim"])
                        + "  " + tyre_choice["loadIndex"] + tyre_choice["speedIndex"])
            # construct tyre data json
            tyre_data = {"tyreType": tyre_choice["tyreType"],
                         "width": tyre_choice["width"],
                         "ratio": tyre_choice["ratio"],
                         "rim": tyre_choice["rim"],
                         "loadIndex": tyre_choice["loadIndex"],
                         "speedIndex": tyre_choice["speedIndex"],
                         "markings": markings,
                         "ladenOption": laden_option,
                         "normalBar": tyre_choice["pressure"]["bar"],
                         "normalPSI": tyre_choice["pressure"]["psi"],
                         "ladenBar": laden_bar,
                         "ladenPSI": laden_psi}

            tyre_types[tyre_choice["tyreType"]].append(tyre_data)

        return_json = {"success": True,
                       "status_code": status_code,
                       "message": SUCCESS_200,
                       "data": {
                           "vrm": get_json["vrm"],
                           "make": get_json["make"],
                           "model": get_json["model"],
                           "frontTyres": tyre_types["FRONT"],
                           "rearTyres": tyre_types["REAR"],
                           "bothTyres": tyre_types["BOTH"]
                       }}
        return return_json
    elif status_code == 400:
        # Bad Request
        return {"success": False,
                "status_code": 400,
                "message": BAD_REQUEST_400,
                "data": get.json()}

    elif status_code == 404:
        return {"success": False,
                "status_code": 404,
                "message": NOT_FOUND_404,
                "data": get.json()}

    elif status_code == 500:
        # Internal server error
        return {"success": False,
                "status_code": 500,
                "message": API_INTERNAL_ERROR_500,
                "data": {
                    "error": get.text
                }}

    elif status_code == 401:
        # invalid access
        return {"success": False,
                "status_code": 401,
                "message": BAD_KEY_401,
                "data": {
                    "error": get.text
                }}

    else:
        # other unknown errors
        return {"success": False,
                "status_code": status_code,
                "message": f"Unknown response received from Tyrerunner API with code {get.status_code}",
                "data": {
                    "error": get.text
                }}


if __name__ == "__main__":
    # print(requests.get("http://127.0.0.1:6767/tyre-data/" + TEST_PLATE))
    # print(requests.get("http://127.0.0.1:6767/tyre-data/" + TEST_PLATE).json())

    print(requests.get("http://backend-gla-team22.azurewebsites.net/tyre-data/" + TEST_PLATE))
    print(requests.get("http://backend-gla-team22.azurewebsites.net/tyre-data/" + TEST_PLATE).text)
