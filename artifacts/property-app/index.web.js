import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('fraktal', () => App);

AppRegistry.runApplication('fraktal', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
