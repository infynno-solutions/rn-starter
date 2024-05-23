This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# Components

Here is the list of custom components that can be reusable in any react-native app.

- Accordion
- AMPiechart
- AnimatedInput
- AnimatedTileScrolling
- Avatar
- Badge
- BottomSheetComponent
- Button
- CustomImageLoader
- CustomSvgs
- DraggableComponent
- DropDown
- EmptyRecord
- Header
- IconButton
- IconContentCard
- InputText
- InViewPort
- Loader
- ModalComponent
- OnBoardingPager
- Icons (VectorIconSet)

# Firebase Email/Password Authentication

This boilerplate includes firebase authentication using email and password. 
- New User Registration
- LogIn User

To learn more about React Native Firebase Authentication, take a look at the following resources:
- [Firebase Email/Password Authentication](https://rnfirebase.io/auth/usage)

# Structure
 
Folder structure of this boilerplate with information

- android 
   - Contains all folders and files of native android platform
- ios
   - Contains all folders and files of native ios platform
- src
   - api (contains index.ts file which handles api requests with axiosInterceptor)
   - assets (all images and fonts should be declared in this folder)
   - components (contains all custom components like button, loader, Modal)
   - constants (contains all constants declarations like colors, fonts etc..)
   - hooks (contains custom declared hooks that can be reusable)
   - interfaces (contains all interfaces and types modal declarations)
   - navigation (contains all type of navigation and routes)
   - screens (contains all screen files)
   - services (contains firebase auth services)
   - store (contains redux store file that holds all over app data in store)
   - styles (custom stylesheet is declared in this folder which is common stylesheet and can be reused)
   - utils (contains helper.ts file which provides usefull helper functions and methods)
   - validation (contains all validation declrations for froms used in app)

- Theme
   - Contains Dark & Light theme support 

