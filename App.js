import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {AuthContext, AuthProvider} from './src/providers/AuthProvider';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CommentScreen from './src/screens/CommentScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';


const AuthStack =createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack=createStackNavigator();
const ProfileStack=createStackNavigator();

const AuthStackScreen=()=>{
  return(
    <AuthStack.Navigator initialRouteName='Signin'>
      <AuthStack.Screen name='SignIn' component={SigninScreen} options={{headerShown: false}}/> 
      <AuthStack.Screen name='SignUp' component={SignupScreen} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  );
}

const HomeTabScreen=()=>{
  return(
    < HomeTab.Navigator initialRouteName='Home'>
      < HomeTab.Screen name='Home' component={HomeScreen} options={{headerShown: false, tabBarLabel: "Home",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Entypo name="home" color="white" size={26} />
        ) : (
          <AntDesign name="home" color="white" size={22} />
        )
        }}/>

      < HomeTab.Screen name="Notification" component={NotificationScreen} options={{tabBarLabel: "Notifications",
      tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons name="ios-notifications-outline" size={22} color="white"/>
            )
        }}
      />

    </ HomeTab.Navigator>
  );
}


const HomeStackScreen =()=>{
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={ HomeTabScreen}  options={{headerShown: false}}/>
      <HomeStack.Screen name='Comment'component={ CommentScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  )

}

const ProfileStackScreen =()=>{
  return(
    <ProfileStack.Navigator initialRouteName='Profile'>
      <ProfileStack.Screen name='Profile' component={ProfileScreen }  options={{headerShown: false}}/>
      <ProfileStack.Screen name='EditProfile'component={ EditProfileScreen} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  )

}


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={ HomeStackScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileStackScreen} />

    </AppDrawer.Navigator>
  );
}

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
      {(auth)=>(
            <NavigationContainer >
              {auth.IsloggedIn ? <AppDrawerScreen/>:<AuthStackScreen/>}
            </NavigationContainer>
      )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
