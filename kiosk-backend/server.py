# flask server that receives the data from the SDK and sends it to frontend
# not using 2nd post request 

from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS needed to have all routes in app 

from  datetime import datetime
import json, os, configparser

# ----------------------------- CONFIG -----------------------------

# container class for config
class ConfigDefault:
    SECTION = "Kiosk Backend"
    DOMAIN_VAR = "domain"
    DOMAIN_VAL = "http://gla-team22.azurewebsites.net"
    ENDPOINT_VAR = "endpoint"
    ENDPOINT_VAL = "url-data"
    LICENCEPLATE_VAR = "licenceplate"
    LICENCEPLATE_VAL = "licenceplate"
    SENSOR_READINGS_VAR = "sensorreadings"
    SENSOR_READINGS_VAL = "sensorreadings"
    PROB_SCORE_THRESHOLD_VAR = "PROB_SCORE_THRESHOLD"
    PROB_SCORE_THRESHOLD_VAL = 0.6
    LOADING_BUFFER_TIME_VAR = "LOADING_BUFFER_TIME"
    LOADING_BUFFER_TIME_VAL = 40
    DETECTION_BUFFER_TIME_VAR = "DETECTION_BUFFER_TIME"
    DETECTION_BUFFER_TIME_VAL = 10


def create_config() -> None:
    config_init = configparser.ConfigParser()
    config_init[ConfigDefault.SECTION] = {ConfigDefault.DOMAIN_VAR: ConfigDefault.DOMAIN_VAL,
                                          ConfigDefault.ENDPOINT_VAR: ConfigDefault.ENDPOINT_VAL,
                                          ConfigDefault.LICENCEPLATE_VAR: ConfigDefault.LICENCEPLATE_VAL,
                                          ConfigDefault.SENSOR_READINGS_VAR: ConfigDefault.SENSOR_READINGS_VAL,
                                          ConfigDefault.PROB_SCORE_THRESHOLD_VAR: ConfigDefault.PROB_SCORE_THRESHOLD_VAL,
                                          ConfigDefault.LOADING_BUFFER_TIME_VAR: ConfigDefault.LOADING_BUFFER_TIME_VAL,
                                          ConfigDefault.DETECTION_BUFFER_TIME_VAR: ConfigDefault.DETECTION_BUFFER_TIME_VAL
                                          }
    # write
    with open("config.ini", "w") as config_file:
        config_init.write(config_file)

    return

def read_config():
    # if config file does not exist -> create
    if not os.path.isfile("config.ini"):
        create_config()

    # open config
    config = configparser.ConfigParser()
    config.read("config.ini")

    global DOMAIN, ENDPOINT, LICENSE_PLATE_NAME, SENSOR_READINGS_NAME, PROB_SCORE_THRESHOLD, LOADING_BUFFER_TIME, DETECTION_BUFFER_TIME
    DOMAIN = config.get(ConfigDefault.SECTION, ConfigDefault.DOMAIN_VAR)
    ENDPOINT = config.get(ConfigDefault.SECTION, ConfigDefault.ENDPOINT_VAR)
    LICENSE_PLATE_NAME = config.get(ConfigDefault.SECTION, ConfigDefault.LICENCEPLATE_VAR)
    SENSOR_READINGS_NAME = config.get(ConfigDefault.SECTION, ConfigDefault.SENSOR_READINGS_VAR)
    PROB_SCORE_THRESHOLD = float(config.get(ConfigDefault.SECTION, ConfigDefault.PROB_SCORE_THRESHOLD_VAR))
    LOADING_BUFFER_TIME = int(config.get(ConfigDefault.SECTION, ConfigDefault.LOADING_BUFFER_TIME_VAR))
    DETECTION_BUFFER_TIME = int(config.get(ConfigDefault.SECTION, ConfigDefault.DETECTION_BUFFER_TIME_VAR))

    return

def create_app():
    read_config()
    app = Flask(__name__)
    CORS(app)  # enable CORS for all routes in the app 
    return app

app = create_app()

# ----------------------------- END OF CONFIG -----------------------------

data_list = []              # list to store data from SDK
vehicleDetected = False     # vehicle detected flag
curr_licenceplate = ""
last_updated_time = datetime.now()
detected_time = 0

def check_licenceplate(licenceplate):
    global curr_licenceplate

    if licenceplate == curr_licenceplate:
        return True 
    else:
        curr_licenceplate = licenceplate
        return False

def check_within_loading_buffer():
    global last_updated_time, curr_licenceplate, detected_time, vehicleDetected
    current_time = datetime.now()
    elapsed_time = int((current_time - last_updated_time).total_seconds())
    print("The last POST request received was: " + str(elapsed_time) + " seconds")

    if elapsed_time < LOADING_BUFFER_TIME:
        return True    
    else: 
        curr_licenceplate = ""
        detected_time = 0
        vehicleDetected = False
        return False

def check_detection_time():
    global detected_time

    if detected_time >= DETECTION_BUFFER_TIME:
        return True    
    else: 
        return False

# receive data from SDK 
@app.route('/url-data', methods=['POST'])
def handle_url_data():

    global vehicleDetected, curr_licenceplate, last_updated_time, detected_time

    # get the data from the SDK
    form = request.form
    carData = json.loads(form["json"])
    new_licenceplate = carData['data']['results'][0]['plate']
    carProbScore = carData['data']['results'][0]['dscore']

    # ------ if using cardata's timestamp ------
    # carTimestamp = carData['data']['timestamp']
    # last_updated_time = datetime.strptime(carTimestamp, "%Y-%m-%dT%H:%M:%S.%fZ")
    current_time = datetime.now()

    if carProbScore > PROB_SCORE_THRESHOLD: # means car is within range 

        # checks whether licence plate is matched 
        if check_licenceplate(new_licenceplate):
            detected_time += int((current_time - last_updated_time).total_seconds())
            # checks vehicle is detected for at least DETECTION_BUFFER_TIME to be considered "detected"
            if check_detection_time():      
                vehicleDetected = True
                print("New vehicle: " + data_list[0]['data']['results'][0]['plate'] + " detected for " + str(detected_time) + " seconds")
                
            else:
                vehicleDetected = False

        else:   # means different vehicle detected
            data_list.clear()              # just to make sure any previous data is cleared before appending new data
            data_list.append(carData)      # add data to the list
            detected_time = 0               # reset detected time
            vehicleDetected = False        # reset vehicle detected flag because vehicle has to be detected for at least DETECTION_BUFFER_TIME 
        
    else:   # means car is NOT within range 
        vehicleDetected = False

    last_updated_time = current_time

    print("Vehicle detected status: " + str(vehicleDetected))
    print("Last updated time: " + str(last_updated_time))
    return jsonify({"message": "Data received successfully"})


@app.route('/get-data', methods=['GET'])
def getData():

    global vehicleDetected
    if data_list and check_within_loading_buffer() and vehicleDetected:     # makes sure data_list is not empty and is currently still within loading buffer time
        
        # gets the latest data 
        latest_data = data_list[0]  

        # new:
        registration_plate = (latest_data['data']['results'][0]['plate']).upper()     # data from SDK
        sensor_readings = '30,32,28,31'                                     # temporary dummy data as TPMS is not implemented yet
        
        # generate url
        urlGenerated = DOMAIN + '/' + ENDPOINT + '?' + LICENSE_PLATE_NAME + '=' + registration_plate + '&' + SENSOR_READINGS_NAME + '=' + sensor_readings

        print(f"url: {urlGenerated}")
        return jsonify({
            "url": urlGenerated,
            "vehicleDetected": vehicleDetected,
            "registration_plate": registration_plate,
            })
    else:
        vehicleDetected = False
        return jsonify({"vehicleDetected": vehicleDetected})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
