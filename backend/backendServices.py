import json
from flask import Flask, jsonify, request
import getTyreData
app = Flask(__name__)


PORT = 6767


from flask_cors import CORS

app = Flask(__name__)

# Enable CORS, can change the port to the real port, make it temporarly for test
CORS(app, resources={r"/*": {"origins": "http://localhost:4321"}})



@app.route("/tyre-data/<string:plate>", methods=["GET"])
def get_tyre_data(plate: str):
    try:
        return getTyreData.get_tyre_data(plate)
    except getTyreData.APIRequestFailed as apiEx:
        return jsonify({"error": str(apiEx),
                        "code": apiEx.err_code,
                        "response": apiEx.response.json()}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(port=PORT)


