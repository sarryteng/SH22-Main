# flask server that receives the data from the SDK and sends it to frontend

from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS needed to have all routes in app 

import json

app = Flask(__name__)
CORS(app)  # enable CORS for all routes in the app 

# list to store data
data_list = []

@app.route('/url-data', methods=['POST'])
def handle_url_data():

    form = request.form
    data = json.loads(form["json"])

    # ------------- when standby page is ready -------------
    if data['hook']['event'] == 'recognition':
        data_list.append(data)      # add data to the list
        print("Vehicle detected (entered)")

    if data['hook']['event'] == 'dwell_time':        # means vehicle left
        data_list.clear()       # clear the list to signify to frontend so that standby page will be shown
        print("Vehicle left")

    # just to make sure data was received from SDK --- uncomment if needed
    # print(f"Received JSON data: {data}")

    return jsonify({"message": "Data received successfully"})


@app.route('/get-data', methods=['GET'])
def getData():

    # checks if data_list is empty
    if not data_list:
        return jsonify({"message": "No data available"})
    
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

if __name__ == '__main__':
    app.run(debug=True, port=8000)
