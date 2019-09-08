# Installation
## prerequisite
Make sure below applications are installed<br/>
NodeJS<br/>
Python 3<br/>
## Commands
Clone this repository<br/><br/>
To build UI component developed with ReactJS + Material-UI<br/>
Open a terminal here (clone directory) and move to folder movie-app (cd movie-app) and install dependacies and run build with below two commands<br/>
```
npm install
npm run build
```
To build and run backend developed with Python 3 + virtualenv + Flask<br/>
Open a terminal here (clone directory) and move to folder movie-app-server (cd movie-app-server) and install dependacies run with below commands<br/>
```
python -m pip install virtualenv
virtualenv env
env\Scripts\activate
python -m pip install Flask   // this command will install Flask into the virtual env
python app.py   // this command will start a server
```
<br/>
Now the app can be accessed with url - http://127.0.0.1:5000<br/>



