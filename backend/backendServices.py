import json
import traceback
from flask import Flask, jsonify, request
import getTyreData
import configparser
import os
from flask_cors import CORS


# container class for env var names
class Env:
    API_PORTAL = "API_PORTAL"
    PARAM_NAME = "PARAM_NAME"
    API_KEY = "TYRERUNNER_API_KEY"
    USE_CONFIG = "USE_CONFIG_FILE"


# container class for config
class ConfigDefault:
    SECTION = "TyreRunner API"
    API_PORTAL_VAR = "api_portal"
    API_PORTAL_VAL = "https://qa-tyrerunner-api.azure-api.net/vrm/v1/VRM/TyreDataByVRM"
    PARAM_NAME_VAR = "param_name"
    PARAM_NAME_VAL = "VehicleNumberPlate"
    API_KEY_VAR = "api_key"
    API_KEY_VAL = "ENTER_API_KEY_HERE"
    USE_CONFIG_TRUE = "True"
    USE_CONFIG_FALSE = "False"


PORT = 6767

# global vars
global API_PORTAL, PARAM_NAME, API_KEY

# CONFIG FLAG
USE_CONFIG_FILE = ConfigDefault.USE_CONFIG_TRUE == os.getenv(Env.USE_CONFIG, default=ConfigDefault.USE_CONFIG_FALSE)


def if_use_config(alt_func=lambda *args, **kwargs: None):
    def inner(func):
        def wrapper(*args, **kwargs):
            if USE_CONFIG_FILE:
                return func(*args, **kwargs)
            else:
                return alt_func(*args, **kwargs)
        return wrapper
    return inner

        
@if_use_config
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


def __read_config_no_config(val_sec: str, val_name:str):
    if val_sec != ConfigDefault.SECTION:
        raise Exception("Wrong section in config. Expected " + ConfigDefault.SECTION + " received: " + val_sec)
    match val_name:
        case ConfigDefault.API_PORTAL_VAR:
            return ConfigDefault.API_PORTAL_VAL
        case ConfigDefault.API_KEY_VAR:
            return ConfigDefault.API_KEY_VAL
        case ConfigDefault.PARAM_NAME_VAR:
            return ConfigDefault.PARAM_NAME_VAL
        case _:
            raise Exception("Value: " + val_name + " not found.")


@if_use_config(__read_config_no_config)
def read_config(val_sec: str, val_name: str):
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

    # update api key in config
    # update_api_key(api_key)
    return api_key


@if_use_config
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


# ====================================================================================================


def create_app():
    app = Flask(__name__)
    set_globals()
    # regex version of CORS
    CORS(app, resources={r"/*": {"origins": [r"^https?:\/\/localhost:[0-9]{2,}$",
                                             r"^https?:\/\/.*gla-team22\.azurewebsites\.net([\/:].*)*$",
                                             r"^https?:\/\/127\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]{2,}$",
                                             r"^https?:\/\/192\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]{2,}$",
                                             r"^https?:\/\/172\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]{2,}$"]
                                 }})
    return app


# app def
app = create_app()

# Enable CORS, can change the port to the real port, make it temporarly for test
# CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})


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


def main():
    app.run(port=PORT)


if __name__ == "__main__":
    main()

