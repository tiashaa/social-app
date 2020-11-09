import React from 'react';
import {View, StyleSheet} from 'react-native';
import{Input, Button, Card}from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';



const SignupScreen = (props)=>{
    return(
        <View style={styles.Viewstyle}>
           <Card>
                <Card.Title>Welcome To App</Card.Title>
                <Card.Divider/>
                <Input
                leftIcon={<Entypo name="person" size={24} color="black" />}
                placeholder='Name'/>

                <Input
                leftIcon={<Entypo name="id" size={24} color="black" />}
                placeholder='Student Id'/>

                <Input
                leftIcon={<Entypo name="email" size={24} color="black" />}
                placeholder='Email Address'/>

                <input
                leftIcon={<Entypo name="key" size={24} color="black" />}
                placeholder='password'
                />

                <Button
                icon={<Entypo name="login" size={24} color="black" />}
                title='Sign Up'
                type='solid'
                />

                <Button
                icon={<Entypo name="question" size={24} color="black" />}
                title='Donot have an account?'
                type='clear'
                onPress={function (){props.navigation.navigate("SigninScreen");}}
                />

               
            </Card>
            </View>
    );
}

const styles = StyleSheet.create(
    {
        Viewstyle:{
           flex:1,
           justifyContent:"center",
           backgroundColor: 'Red'

        },
    }
)

export default SignupScreen