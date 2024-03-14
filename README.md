# SH22 Main
- Team Project SH22 Course 2023-24

# Project Description
This project aims to provide educational information for drivers about the optimal pressure of their tyres. The project consists of two parts
* **Web Application**: to provide an interface for user to interact with. This website will show the optimal tyre pressure specific for the model of the driver's car, presenting it in an easy-to-understand graphic. Additionally, the website can also show diagnostic information(if the current tyre pressure values are available), showing which tyre(s) has low/high pressure than optimal.
* **Kiosk**: to identify critical information about the user's car, and provide a gateway for the user to reach the website. This section is intended to be ran entirely offline, on a raspberry pi. The kiosk reads the plate number of the car that it sees via a camera, and presents a QR code for the driver to open the web application.

# How to Run
To run either the kiosk or the web application, clone the repository with 

```
git clone git@stgit.dcs.gla.ac.uk:team-project-h/2023/sh22/sh22-main.git
```

## Web Application
The web application is designed to be central in nature, where a lot of kiosks direct users to one central site. 

There are two components: frontend and backend

### Backend
Webapp backend is written in python and uses flask to run. Now, the backend is hosted at https://backend-gla-team22.azurewebsites.net.

Backend requires:
* python
* Tyrerunner APIs
* Other requirements in [here](requirements.txt)

For further information about:
* Available APIs and their details, [navigate here](https://stgit.dcs.gla.ac.uk/team-project-h/2023/sh22/sh22-main/-/wikis/Documentation/Webapp-Backend)
* How to setup and configure backend, [navigate here](https://stgit.dcs.gla.ac.uk/team-project-h/2023/sh22/sh22-main/-/wikis/Documentation/User-Manual/Webapp-Backend)

### Frontend
Webapp frontend is written using Astro. The website is hosted at https://gla-team22.azurewebsites.net.

> TODO add links to wikis

## Kiosk
Kiosk is designed and tested on a raspberry pi machine. It is intended to be run offline, and distributed to parking spaces.

Kiosk requires:
* python
* npm
* Platerecognizer SDK
* docker

Kiosk also requires `flask`, `flask-cors` and `requests` packages. If needed, run:

```
pip install flask flask-cors requests
```

For instructions on how to run the kiosk, [navigate here](https://stgit.dcs.gla.ac.uk/team-project-h/2023/sh22/sh22-main/-/wikis/Documentation/User-Manual/Platerecognizer)

> not sure about links

