# Notes for reviewers

## Where the application is hosted

https://coronatrackerapplication.herokuapp.com/

## Where to find code

https://github.com/AleksandarAleksandar/corona-meeting-tracker

## How to start the appliacation

In CMD open project folder. Then run "npm start". You need to have NPM installed.

## How to make new build

Instructions on: https://create-react-app.dev/docs/deployment/

## Explaining the choices

Guiding principle while developing the application was to limit the number of libraries and modules. Exception was the date range module ("react-date-range": "^1.0.3") because building that functionality from scratch would require a huge amount of time.

### Technologies

Application was build using React + Redux + Redux-thunk.

### Ajax simulator

Considering that this is an interview for a frontend developer position, I did not use any solutions that would include backend. However, I have simulated ajax requests with ajax simulator ( /utils/ajax-simulator-utils.js ) which mimics fetch requests. That way I have applied spinners and now the backend can easily be plugged in into this application.

### Search feature

This was the only point in the challange that was not 100% clear to me. My understanding of type ahead is that I need to implement functionality that will search after each symbol we enter into a search bar to show results live without needing to submit search query by pressing the submit button. Hopefully I got it right.

This is not real search (since we don't have API), but we narrow down results that we are showing through filtering (/utils/filter-utils.js).

### Geo Location

I have used the navigator method (/utils/geo-utils.js) that exists in a browser. We can use this to get the current location of the user (that way the user can take a note of each potentially risky meeting easily with one click). Additionally the user can enter lat and long in order to add some other location.

### Add people form

Form is designed to use minimal css rules and with simple validation feedback when error occurs, conditional submit, toasts as a feedback for successful submit. This way we get "material design way" design. Both modals and toasts I have created myself.

## Progresive Web App

App is PWA ready, you can download and open it on your mobile device.