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


## CI / CD links
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
- [Icons explorer](https://icons.expo.fyi/Index)

- Custom CSS is the `/styles` directory, 
which includes:
  -  `index.ts` for classes that are intended to be used globally.
  - `chat.ts` , `posts.ts`, `learning.ts` Files corresponding to major domains of the project, 
  - `/variables` subdirectory for all CSS variables.
 
## Flows
### Create new user
  If there is no user object in the local storage, the app will present a sign up page which takes the email and password, and updates the newUser redux object, then presents a new page where the user has to fill in a few more inputs, said inputs data update the newUser redux object.
  Finally the user clicks the 'Sign up' button, 
  this action triggers a fetch request that saves the new user to the database and returns the user object which is saved to the local storage, the the sign up forms are dismounted and the user's dashboard is rendered.


 ## Functions
 '/functions' contains normal functions and the '/hooks' subdirectory

 ### Custom hooks
 -  useLogIn ( /functions/hooks/user.tsx )

     This hook takes the 'user' as a parameter (type UsetT), it saves the user to the local storage, and changes the loggedIn value in the redux 'status' object to true.

-  useLogOut (/functions/hooks/user.tsx)
   This hook clears the local storage and updates the state of the user in the 'useUserData' hook

- useUserData() (/functions/hooks/user.tsx)

  - Usage 
    Use this hook anywher as follows: `const user = useUserData();`

  - Description
    This hook gets the user data from the local storage and updates it's state automatically when the user from local storage is added or deleted.

- useLocation() (/functions/hooks/user.tsx)
  - environment variable: WEATHER_API_KEY
  - use:     const [city, country, loading, error] = useLocation()
  - This hook uses the `expo-location` library to get the user's latitude and longhitude, then uses the [open weather API](https://openweathermap.org/api) to obtail the city and the country.
  -  The weather API has been chosen because it takes no credit card to subscribe and offers enouth free calls per day.

      
-  useCustomTabIcon ( functions/hooks/navigation.tsx )

     This hook takes the 'library' and the 'name' of the icon as mandatory parameters, and returns the icon object to show in the Tabs, it can also take other parameters which have default values.

# Loh in with google

- To manage the google project
  - Go to the [Google cloud dashboard](https://console.cloud.google.com/apis/dashboard)
  - Select the project: 'Fluently' (or create a new project if needed)
  - Congigure OAuth consent screen 
    - App name : Change this if the name of the app changes
    - If necessary add any link to the consent screen here.
    - Select scopes (enable email and public profile)
    - Select Test users (They have access while publishing status is set to "Testing")
  - Create credentials: OAuth client ID
    - A different Cliend ID must be created for each platform (e.g.: Web, iOS, Android)  
      - Run ```npx expo prebuild``` 
        - This will create the "package" field into the android object in app.json
      - iOS:
        - Create IOS bundleIdentifier (i.e.:bundle ID) in the iOS object in app.json
      - Android:  
        - package name = "package" field in the android object in app.json
        - Create SHA-1 certificate fro android/google Oauth on my (the developer) machine:
          open the terminal as an administrator and run:
          keytool -list -v -alias androiddebugkey -keystore "D:\fluently\fluently_client\android\app\debug.keystore"
          check that the path to "debug.keystore" is correct
            - check local notes for password hint


## Environment variables

# Run project locally

- Run the back-end on localhost:3000

## External documentation

- [Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification)