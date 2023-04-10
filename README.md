# rn-starter
# Steps to setup environment

```sh
Node module install
# yarn
Project Run
# yarn run start (yarn react-native start)

Android environment

# yarn run android OR npx react-native run-android
IOS environment
# yarn run ios OR npx react-native run-ios 
```

## Folder structure
This boilerplate follows a very simple project structure:

- src: This folder is the main container of all the code inside your application.
  - actions: This folder contains all actions that can be dispatched to redux.
  - components: Folder to store any common component that you use through your app (such as a generic button)
  - constants: Folder to store any kind of constant that you have.
  - controllers: Folder to store all your network logic (you should have one controller per resource).
  - navigation: Folder to store the navigators.
  - reducers: This folder should have all your reducers, and expose the combined result using its index.js
  - screens: Folder that contains all your application screens/features.
     - Screen: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
       - Screen.tsx
 - selectors: Folder to store your selectors for each reducer.
 - storage: Folder that contains the application storage logic.
 - store: Folder to put all redux middlewares and the store.
 - test-utils: Folder to store tests-related utilities and components.
 - theme: Folder to store all the styling concerns related to the application theme.
 - App.js: Main component that starts your whole app.
 - index.js: Entry point of your application as per React-Native standards.


## Ignoring More Files

 For your source control, you'll want to start ignoring the .jest folder. If you're using git, we can just add entries to our .gitignore file.

```sh
# Jest
#
.jest/
```

 As a checkpoint, consider committing your files into version control.
 
 ```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```
 
 ## Screens

In this folder, you have the main objects to apply the composition architecture. Just create a folder for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.

## Components

We can now add a component to our app. If you want create a component then go to the components folder and create the component file `{name}.tsx`.
