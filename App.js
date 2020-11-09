import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'

import {AuthProvider, AuthContext} from './src/Provider/AuthProvider'

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStackScreen = () =>{
  return(
    <HomeStack.Navigator initialRouteName = "HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="StorageScreen" component={StorageScreen} />
    </HomeStack.Navigator>
  );
}

const AuthStackScreen = () =>{
  return(
    <AuthStack.Navigator initialRouteName = "SigninScreen">
      <AuthStack.Screen name ="SigninScreen" component={SigninScreen} Option={{headerShown:false}} />
      <AuthStack.Screen name ="SignupScreen" component={SignupScreen} Option={{headerShown:false}} />
    </AuthStack.Navigator>
  );
}

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth)=>(<NavigationContainer>
          
          {auth.IsLoggedIn ?<HomeStackScreen/> : <AuthStackScreen/>}
        </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>

  );
}

export default App;