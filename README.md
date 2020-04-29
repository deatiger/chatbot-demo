## Name
[Chatbot｜とらゼミ](https://chatbot-demo-1bc98.web.app/)

## 01. Overview
This is DEMO app for "日本一わかりやすいReact入門【実践編】" produced by とらゼミ  
This app is developed as teaching materials for React.  
[YouTube Link](https://www.youtube.com/playlist?list=PLX8Rsrpnn3IVOk48awq_nKW0aFP0MGpnn)

## 02. Installation
### create-react-app
`npx create-react-app YOUR_PROJECT_NAME`

### `npm start`

### Material-UI
`npm install --save @material-ui/core @material-ui/icons @material-ui/system`

### Modifying index.html
1. Delete unnecessary comment rows
2. Modify title and description for your site
3. Add stylesheet for Material-UI  
`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`  
`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />`

## 03. Create Firebase project

### Install firebase-tools globally 
`npm install -g firebase-tools`

### Login your google account (which created a Firebase project)
`firebase login`

### Init local environment to connect Firebase project
`firebase init`

### Install firebase package in your work directory
`npm install --save firebase`

### Deploy your React App to the site hosted by Firebase
`firebase deploy` 

## 10. Firebase

### Execute Cloud Functions API
`curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json" -d @dataset.json`