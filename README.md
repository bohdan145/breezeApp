# <img width="48px" align="center" src="https://skillicons.dev/icons?i=react" />&nbsp;&nbsp; Breeze - React Native Project

Breeze is a mobile application built using Expo, React Native and TypeScript. It fetches the latest weather conditions from the [OpenWeatherMap API](https://openweathermap.org/api) for current or provided location and provides a user-friendly interface. This project uses [React SWR](https://swr.vercel.app/) for data fetching and storing.

## Built with

- React Native (0.73.4)
- Expo SDK (50.0.6)
- React Native Animated API
- Typescript
- [React Navigation](https://reactnavigation.org/)
- [React SWR:React Hooks for Data Fetching](https://swr.vercel.app/)
- [OpenWeatherMap API _(free account)_](https://openweathermap.org/api)
- Love ❤️

## Installation

1. Clone the repository: `git clone https://github.com/your-username/breeze-app.git`
2. Change directory to the project: `cd breeze-app`
3. Install dependencies: `npm install`

## Configuration

- The API key is already included in the project, no additional configuration is needed.

## Running the App

To run the app on an Android emulator:

1. Start an Android emulator using Android Studio
2. Run the command: `npm run android`

To run the app on an iOS simulator:

1. Start an iOS simulator using Xcode
2. Run the command: `npm run ios`

## Acknowledgments

- This project was created as part of a technical test.
- No requirements for storing data in Redux, Mobx where provided, so data is saved on the componenet level using react-swr.
- App fetches data from the [OpenWeatherMap API](https://openweathermap.org/api)
- No requirements for unit tests where provided, so tests for components where not implemented
- Search autocomplete was not implemented (Google Places API is pay-as-you-go pricing model)
