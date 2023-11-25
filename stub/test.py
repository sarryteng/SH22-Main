# this file is a test server for urlgenerator

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/url-data', methods=['POST'])
def handle_url_data():
    data = request.json
    print(f"Received data: {data}")
    return jsonify({"message": "Data received successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
