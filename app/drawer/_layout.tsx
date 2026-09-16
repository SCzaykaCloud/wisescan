import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexScreen from './index';
import ImpressumScreen from './impressum';
import ProtocolScreen from './protoll';
import ConfigScreen from './config';
import ScanScreen from './scan';
import { NavigationContainer } from '@react-navigation/native';
console.log('IndexScreen:', IndexScreen);

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <NavigationContainer independent={true}>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={IndexScreen} />
      <Drawer.Screen name="Scan" component={ScanScreen} />
      <Drawer.Screen name="protocoll" component={ProtocolScreen} />
      <Drawer.Screen name="Config" component={ConfigScreen} />
            <Drawer.Screen name="impressum" component={ImpressumScreen} />
   </Drawer.Navigator>
    </NavigationContainer>
  );
}
