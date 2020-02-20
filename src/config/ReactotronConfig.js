import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import {MY_IP} from 'react-native-dotenv';

if (__DEV__) {
  const tron = Reactotron.configure({host: MY_IP})
    .use(reactotronRedux())
    .use(sagaPlugin())
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
