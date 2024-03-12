import json
import traceback
from flask import Flask, jsonify, request
import getTyreData
import configparser
import os
from flask_cors import CORS

app = Flask(__name__)
PORT = 6767

# Enable CORS, can change the port to the real port, make it temporarly for test
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})



@app.route("/tyre-data/<string:plate>", methods=["GET"])
def get_tyre_data(plate: str):
    try:
        return_json = getTyreData.get_tyre_data(plate, API_KEY, API_PORTAL, PARAM_NAME)
        return return_json, return_json["status_code"]
    except Exception as e:
        return {"success": False,
                "status_code": 500,
                "message": "An error is encountered while trying to call Tyrerunner API.",
                "data": {
                    "error": str(e) + "\n\n" + traceback.format_exc()
                }}, 500
    
#test_backend need this to set config
def main():
        if not os.path.isfile("config.ini"):
            config_init = configparser.ConfigParser()
            config_init["TyreRunner API"] = {"api_portal": "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM",
                                            "param_name": "VehicleNumberPlate",
                                            "api_key": "ENTER_API_KEY_HERE"}
            # write
            with open("config.ini", "w") as config_file:
                config_init.write(config_file)

        # open config
        config = configparser.ConfigParser()
        config.read("config.ini")

        # parse into var
        # globals from tyrerunner api
        global API_PORTAL, PARAM_NAME, API_KEY
        API_PORTAL = config.get("TyreRunner API", "api_portal")
        PARAM_NAME = config.get("TyreRunner API", "param_name")
        API_KEY = config.get("TyreRunner API", "api_key")

        if API_KEY == "ENTER_API_KEY_HERE" or '' :
            API_KEY = input("Enter Ocp-Apim-Subscription-Key for Tyrerunner: ").strip()
            config.set("TyreRunner API", "api_key", API_KEY)
            with open("config.ini", "w") as config_file:
                config.write(config_file)

        

if __name__ == "__main__":
    main()
    app.run(port=PORT)