import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

let tron;
if (__DEV__) {
  tron = Reactotron.configure({host: '192.168.0.103'})
    .use(reactotronRedux())
    .use(sagaPlugin())
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}

export default tron;
