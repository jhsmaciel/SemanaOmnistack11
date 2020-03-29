import React from 'react'
import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Detail from './pages/Detail';
import Incident from './pages/Incidents';

export default function Route() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen
                    name="Incidents"
                    component={Incident}
                />
                <AppStack.Screen
                    name="Detail"
                    component={Detail}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}