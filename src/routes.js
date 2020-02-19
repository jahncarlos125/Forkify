import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '~/pages/Main';
import Favorites from '~/pages/Favorites';

const Routes = createAppContainer(
  createStackNavigator({
    Main,
    Favorites,
  }),
);

export default Routes;
