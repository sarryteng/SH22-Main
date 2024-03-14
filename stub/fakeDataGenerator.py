import requests

def send_request(url, data):
    try:
        # json=data -> automatically serializes the data dictionary to a JSON-formatted string.
        # json=data is a cleaner and more concise way to send JSON data in a POST request
        response = requests.post(url, json=data)
        response.raise_for_status()     # Raise exception if invalid response
        return response.status_code
    
    except requests.exceptions.RequestException as e:
        print("HTTP request failed with: ", e)
        return -1


def send_url(reg_plate, sensor_readings):

    base_url = 'http://localhost:8000/url-data'
    # base_url =  (`${import.meta.env.PUBLIC_POKEAPI}/url-data`)
    car_data = {
        'licenceplate': reg_plate,
        'sensorreadings': sensor_readings,
    }
    status_code = send_request(base_url, data=car_data)
    return status_code

registration_plate = '23812LA'
sensor_readings = '30,32,28,31'  # Replace with actual sensor readings
result = send_url(registration_plate, sensor_readings)

if result == 200:
    print("URL sent successfully")

elif result == -1:
    print("URL sending failed with status code: ", result)

else:
    print("HTTP request encountered an error")