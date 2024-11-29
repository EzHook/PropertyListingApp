# Welcome to Property Listing App 👋  

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). The app enables users to trade commodities seamlessly without using money.  

## Get started  

1. Install dependencies:  

   ```bash  
   npm install  

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Assumptions

When you're ready, run:

- Map Functionality:
The map is expected to work in production but currently does not due to configuration limitations. However, it works correctly in debug mode on the Android emulator.

- Backend Hosting:
The backend has been hosted on Vercel, and APIs are fully integrated with the app for data retrieval.

## Instructions for the Reviewer
- Testing the Map:

To test map functionality, run the app in the Android emulator and enable debug mode.
Open the developer menu in the emulator and select "Debug JS Remotely."
API Connectivity:
Ensure that you have an active internet connection as the app communicates with the hosted backend for data.

- Expo Compatibility:
If any issues arise, verify that you are using the latest version of Expo CLI.


