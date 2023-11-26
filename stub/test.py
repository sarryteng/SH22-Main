# this file is a test server for urlgenerator

from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS needed to have all routes in app 


app = Flask(__name__)
CORS(app)  # enable CORS for all routes in the app 


# list to store data
data_list = []

@app.route('/url-data', methods=['POST'])
def handle_url_data():
    data = request.json
    print(f"Received data: {data}")

    data_list.append(data)      # add data to the list

    return jsonify({"message": "Data received successfully"})


@app.route('/get-data', methods=['GET'])
def getData():

    # checks if data_list is empty
    if not data_list:
        return jsonify({"message": "No data available"})
    
    # gets the latest data -> -1 because (used append so) latest data is at end of list 
    latest_data = data_list[-1]  
    
    registration_plate = latest_data.get('licenceplate', '')
    sensor_readings = latest_data.get('sensorreadings', '')
    
    # generate url
    urlGenerated = f'http://localhost:8000/url-data?licenceplate={registration_plate}&sensorreadings={sensor_readings}'
    
    return jsonify({"url": urlGenerated})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
