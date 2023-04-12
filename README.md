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

- src
  - store
    - actions
    - reducers
  - screens
  - navigation
  - global
  - components
  - styles
  - utils
  - Apis
  - hooks

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

## Code Pattern and Formatting to follow

1. Naming Conventions

- Use pascal case for naming file and folders
- Include all the control in a single import belong to same module end with semicolon. There should be no space between two imports. (ex. import {ScrollView, View, TouchableOpacity, KeyboardAvoidingView, ListView, AsyncStorage, Alert } from ‘react-native’;)

2. Structuring Folders

- All the components, globals, images, redux etc.. Should be written inside the app folder
- All the components except global components should be written inside the components folder under an app folder.
- A style for every page is written in its corresponding folder. Below, we can see the example of about screen
- All the global components, global styles, golbal data etc .. should be written in the globals folder under an app folder
- Global functions for API requests should be written in the request folder under the app folder
- If using redux, then the redux files should be written inside the store folder under the app folder

3. Putting Import Orders

- React import
- Library imports (Alphabetical order)
- Absolute imports from the project (Alphabetical order)
- Relative imports (Alphabetical order)
- Import \* as

4. Variables Naming

- let const var declarations should be camelcase
- use proper naming of variables

  5.Functional compnent or class compnent Structure
  Component declaration
  {
  Hook declarations
  State declarations
  //comment of function with use case, date,name
  functions(){
  }
  return(){
  }
  }

6. Other points to use while coding

- Do not use inline Styles
- Do not use inline functions
- Maintain Consistency
- Keep code length as low as possible
- Use custom components
- Use minimal third party libraries
- Use proper naming of variables, functions, classes etc…

## Extensions for TypeScript, JavaScript in React native

- Eslint
- Prettier
- React Native Snippets
- ES7+ React/Redux/React-Native snippets
- Gitlens
- Stylelint
- Auto Close Tag
- Auto Rename Tag
- Color Highlight
- Auto Import
