import React from 'react';
import {View, StyleSheet} from 'react-native';
import{Input, Button, Card}from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import {AuthContext} from '../Provider/AuthProvider'





const SigninScreen = (props)=>{
    return(
        <AuthContext.Consumer>
        <View style={styles.Viewstyle}>
           <Card>
                <Card.Title>Welcome To App</Card.Title>
                <Card.Divider/>
                <Input
                leftIcon={<Entypo name="email" size={24} color="black" />}
                placeholder='Email Address'/>

                <input
                leftIcon={<Entypo name="key" size={24} color="black" />}
                placeholder='password'
                secureTextEntry={true}
                />

                <Button
                icon={<Entypo name="login" size={24} color="black" />}
                title='Sign In'
                type='solid'
                onPress={function (){auth.IsLoggedIn(true);}}
                />

                <Button
                icon={<Entypo name="question" size={24} color="black" />}
                title='Already have an account?'
                type='clear'
                onPress={function (){props.navigation.navigate("SignupScreen");}}
                />

               
            </Card>
            </View>
            </AuthContext.Consumer>
    );
}
const styles = StyleSheet.create(
    {
        Viewstyle:{
           flex:1,
           justifyContent:"center"

        },
    }
)

export default SigninScreen