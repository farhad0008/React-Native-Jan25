/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
// import store from './redux/store'; 
import {store }from './reduxToolkit/store/Store.js'
const AppRedux=()=>(
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
