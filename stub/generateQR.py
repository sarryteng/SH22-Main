import qrcode

def generate_qr_code(reg_plate, sensor_readings):

    base_url = 'https://tyrerunner/type-pressure/homepage/'
    url = f'{base_url}?licenceplate={reg_plate}&sensorreadings={sensor_readings}'

    # box size and border
    new_qr_code = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=30,
        border=5
    )

    # include link to your website
    new_qr_code.add_data(url)
    new_qr_code.make(fit=True)

    qr_image = new_qr_code.make_image(fill='black', back_color='white')

    # store all qrcodes image generated in a folder called qr_codes
    return qr_image

registration_plate = '23812LA'
sensor_readings = '30,32,28,31'  # Replace with actual sensor readings
generate_qr_code(registration_plate, sensor_readings).show()