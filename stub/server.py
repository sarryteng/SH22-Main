# flask server that receives the data from the SDK and sends it to frontend
# not using 2nd post request 

from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS needed to have all routes in app 

from  datetime import datetime
import json

app = Flask(__name__)
CORS(app)  # enable CORS for all routes in the app 

PROB_SCORE_THRESHOLD = 0.6      # threshold for probability score -- vehicle's scoreculag must be higher than this to be "recognised"
BUFFER_TIME = 30                # buffer time 

data_list = []              # list to store data from SDK
vehicleDetected = False     # vehicle detected flag
curr_licenceplate = ""
last_updated_time = datetime.now()

def check_licenceplate(licenceplate):
    global curr_licenceplate

    if licenceplate == curr_licenceplate:
        return True 
    else:
        curr_licenceplate = licenceplate
        return False

def check_within_buffer():
    global last_updated_time
    current_time = datetime.now()
    elapsed_time = int((current_time - last_updated_time).total_seconds())
    print("Current elapsed time since last plate detection: " + str(elapsed_time) + " seconds")

    if elapsed_time < BUFFER_TIME:
        return True    
    else: 
        return False


# receive data from SDK 
@app.route('/url-data', methods=['POST'])
def handle_url_data():

    global vehicleDetected, curr_licenceplate, last_updated_time

    # get the data from the SDK
    form = request.form
    carData = json.loads(form["json"])
    new_licenceplate = carData['data']['results'][0]['plate']
    carProbScore = carData['data']['results'][0]['dscore']

    # ------ if using cardata's timestamp ------
    # carTimestamp = carData['data']['timestamp']
    # last_updated_time = datetime.strptime(carTimestamp, "%Y-%m-%dT%H:%M:%S.%fZ")
    last_updated_time = datetime.now()

    if carProbScore > PROB_SCORE_THRESHOLD: # means car is within range and is detected
        vehicleDetected = True
        print("Vehicle detected status: " + str(vehicleDetected))

        # checks whether licence plate is matched 
        if check_licenceplate(new_licenceplate):
            print("Vehicle " + new_licenceplate + " still in the area")

        else:   # means different vehicle detected
            data_list.clear()              # just to make sure any previous data is cleared before appending new data
            data_list.append(carData)      # add data to the list
            print("New vehicle: " + data_list[0]['data']['results'][0]['plate'] + " detected")
        
    else:   # means car is not within range hence = NOT detected
        vehicleDetected = False
        print("No vehicle detected")
        data_list.clear()

    print("last updated time: " + str(last_updated_time))
    return jsonify({"message": "Data received successfully"})


@app.route('/get-data', methods=['GET'])
def getData():

    global vehicleDetected
    if check_within_buffer():

        # checks if data_list is empty: if empty means --> no vehicle currently so return vehicleDetected = False
        if not data_list:
            return jsonify({"vehicleDetected": vehicleDetected})
        
        # gets the latest data 
        latest_data = data_list[0]  
        
        # old:
        # registration_plate = latest_data.get('licenceplate', '')
        # sensor_readings = latest_data.get('sensorreadings', '')

        # new:
        registration_plate = latest_data['data']['results'][0]['plate']     # data from SDK
        sensor_readings = '30,32,28,31'                                     # temporary dummy data as TPMS is not implemented yet
        
        # generate url
        urlGenerated = f'http://tyrerunner.com/url-data?licenceplate={registration_plate}&sensorreadings={sensor_readings}'
        
        # just for debugging purposes
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
