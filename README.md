## Introduction

### Project's purpose 
-  Help Thai speakers learn and practice English, and English speakers learn and practice Thai.

- Answer the question 'Where should i start from?' by offering a clear learning path and a list of 'things to learn'.

-  Help the students keep track of their progress and share it with students of the opposite language.

-   Develop a community of people with the common goal of learning each other's language in an environment that fosters intellectual growth and motivation.

### Development approach
-  Develop one code base which can be deployed on Android, iOS and Web.

- Divide the project in 4 domains:
  -  Live chat
  -  Posts
  -  Learning
  -  User


## CI / CD
### development: 
These are links to the work-in-progress, designed to showcase the ongoing development, to facilitate collaboration and to ensure every commit will work as expected in a production environment.

- [Web ( latest commit )](https://fluently-web.netlify.app/)

- [Expo Snack ( i.e., iOS and Android )](https://snack.expo.dev/@2gi3/fluently) 

## Project created with:
-  Node version 20.5.1

-  npx create-expo-app --template blank-typescript@sdk-49

-  npx expo install react-native-web@~0.19.6 react-dom@18.2.0

-  add `"bundler": "metro"` in app.json > expo > web

-  --IMPORTANT-- Do NOT install @expo/webpack-config

## Deployment
### Website configutation
-  Build Comand: `npx expo export`

-  Publish directory: `dist`

## Naming convention
- Types have a 'T' at the end of their name e.g.: MessageT

## UI Styling / CSS
- UI components library: [React Native Elements](https://reactnativeelements.com/)

- Custom CSS is the `/styles` directory, 
which includes:
  -  `index.ts` for classes that are intended to be used globally.
  - `chat.ts` , `posts.ts`, `learning.ts` Files corresponding to major domains of the project, 
  - `/variables` subdirectory for all CSS variables.
 