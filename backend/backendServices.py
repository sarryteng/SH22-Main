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
# CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# regex version of CORS
CORS(app, resources={r"/*": {"origins": [r"^https?://localhost:[0-9]{3,}$",
                                         r"^https?://.*gla-team22\.azurewebsites\.net([/:].*)*$"]
                             }})

# global vars
global API_PORTAL, PARAM_NAME, API_KEY

# TEST FLAG


# container class for env var names
class Env:
    API_PORTAL = "API_PORTAL"
    PARAM_NAME = "PARAM_NAME"
    API_KEY = "TYRERUNNER_API_KEY"


# container class for config
class ConfigDefault:
    SECTION = "TyreRunner API"
    API_PORTAL_VAR = "api_portal"
    API_PORTAL_VAL = "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM"
    PARAM_NAME_VAR = "param_name"
    PARAM_NAME_VAL = "VehicleNumberPlate"
    API_KEY_VAR = "api_key"
    API_KEY_VAL = "ENTER_API_KEY_HERE"


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


def create_config() -> None:
    """
    This function create a new fresh config.ini file
    :return: None
    """
    config_init = configparser.ConfigParser()
    config_init[ConfigDefault.SECTION] = {ConfigDefault.API_PORTAL_VAR: ConfigDefault.API_PORTAL_VAL,
                                          ConfigDefault.PARAM_NAME_VAR: ConfigDefault.PARAM_NAME_VAL,
                                          ConfigDefault.API_KEY_VAR: ConfigDefault.API_KEY_VAL}
    # write
    with open("config.ini", "w") as config_file:
        config_init.write(config_file)

    return


def read_config(val_sec:str, val_name:str):
    """
    Function to read a value from config.ini
    Function will create a fresh config.ini file if it does not exist.
    :return: value as listed in config.ini
    """

    # if config file does not exist -> create
    if not os.path.isfile("config.ini"):
        create_config()

    # open config
    config = configparser.ConfigParser()
    config.read("config.ini")

    return config.get(val_sec, val_name)


def get_api_portal() -> str:
    """check env_var then get from config
    :return: api_portal"""

    api_portal:str = os.getenv(Env.API_PORTAL, default=None)

    if api_portal is None:
        api_portal = read_config(ConfigDefault.SECTION, ConfigDefault.API_PORTAL_VAR)

    return api_portal


def get_param_name() -> str:
    param_name:str = os.getenv(Env.PARAM_NAME, default=None)

    if param_name is None:
        param_name = read_config(ConfigDefault.SECTION, ConfigDefault.PARAM_NAME_VAR)

    return param_name


def get_api_key() -> str:
    api_key:str = os.getenv(Env.API_KEY, default=None)

    if api_key is None:
        api_key = read_config(ConfigDefault.SECTION, ConfigDefault.API_KEY_VAR)

    if api_key == ConfigDefault.API_KEY_VAL:
        # prompt user
        api_key = input("Enter Ocp-Apim-Subscription-Key for Tyrerunner: ").strip()

    # update api key in config
    update_api_key(api_key)
    return api_key


def update_api_key(key:str, overwrite:bool=False) -> None:
    """
    Function to update the api_key in config.ini. By default, will only update if
    the value in config.ini is the default value.
    :param key: API key
    :param overwrite: overwrite the api key in config.ini or not. Default is False
    :return: None
    """
    # read
    config_api = read_config(ConfigDefault.SECTION, ConfigDefault.API_KEY_VAR)

    # if it is not the default -> pass
    if config_api != ConfigDefault.API_KEY_VAL and overwrite:
        return

    # if in config is default -> update with the env var
    # open config and write
    config = configparser.ConfigParser()
    config.read("config.ini")
    config.set(ConfigDefault.SECTION, ConfigDefault.API_KEY_VAR, key)

    with open("config.ini", "w") as config_file:
        config.write(config_file)


def set_globals():
    # declare globals
    global API_PORTAL, PARAM_NAME, API_KEY
    API_PORTAL = get_api_portal()
    PARAM_NAME = get_param_name()
    API_KEY = get_api_key()


def main():
    set_globals()
    app.run(port=PORT)


if __name__ == "__main__":
    main()
