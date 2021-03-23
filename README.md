# SpaceX-API in React Native

For data, this project interacts with the [SpaceX-API](https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4). In addition to Expo and React Native, it uses React Query and React Navigation Shared Element.

## Setup

Probably a good idea to install Expo: `npm install --global expo-cli`.

Then after cloning the repo:

```
yarn install
expo start
```

You can also use `yarn start`. Let it bundle. 

You can also try previewing the app via your phone (iOS). To do that, after running the commands above, press c to show project QR and point your phone's camera at it. You'll need Expo for iOS or Android.

## Goal

- Create a UI for the SpaceX API
  - Should be easy to use
  - Should handle drill down across all cases

## Next / future todo's

- [ ] Add collapsible navbar (show header when scroll up, hide when scroll down)
- [ ] Take advantage of react-query functionalities
- [ ] Organize color palette used, it's not clean
- [ ] Clean up repetitive component styling
- [ ] Add ci/di and error tracking ([Bitrise](https://devcenter.bitrise.io/getting-started/getting-started-with-react-native-apps/), [Bugsnag](https://docs.bugsnag.com/platforms/react-native/expo/))
- [ ] Improve poor performance from shared element animation
- [ ] Test on Android
- [ ] Persist react-query cache

## Decisions

- Why use react-query?
  - Simply put, React Query allows us to store remote data in a cache, and not in a React state.
  - React Query is a type of state manager, specifically designed to manage asynchronous state that you get from outside of your app, so server-state, API state, or anything else that is not local client state.
- Is react-query overkill for interacting with Space X API and doing purely GET requests?
  - I wanted to experiment with persistant data structures and structural sharing. In JavaScript, objects are mutable by default. Under the hood, performing operations on an object means the system is copying every single property of the over. As we have larger objects, that becomes an issue. React Query allows us to experiment with these problems.

## Challenges

- VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate
  - Solution: Waiting for problem to reappear. If it goes, will document.

## Credits

For shared element transitions, credit goes to https://blog.logrocket.com/how-to-use-shared-element-transition-with-react-navigation-v5/ ([@amanhimself][@amanhimself]).

Also, the MissionsDetailScreen FlatList design was inspirated by https://github.com/Alhydra/React-Native-Flatlist-Example.

## Inspiration

Mobile UI design is an interesting challenge.

For user navigation, my inspiration came from a similar web app: https://spacex-project.netlify.app.
