import React, {useState} from 'react';
import {ImageBackground,Text, SafeAreaView, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Fontisto, Feather, FontAwesome, AntDesign  } from '@expo/vector-icons';
import {storeDataJson} from '../functions/AsyncStorageFunctions';

const SignupScreen=(props)=>{
    const [Name, setName]=useState("");
    const [Email, setEmail]=useState("");
    const [Sid, setSid]=useState("");
    const [Password, setPassword]=useState("");
    return(
        <SafeAreaView style={styles.viewStyle}>
            
            <Card>
                <Card.Title style={styles.textStyle}>Welcome to <Text style={styles.textStyle1}>The Office</Text></Card.Title>
                <Card.Divider/>

                <Input 
                leftIcon={<FontAwesome name="user-o" size={24} color="gray" />}
                placeholder='Name'
                onChangeText={
                    function(currentinput){
                        setName(currentinput);
                    }
                }
                ></Input>

                <Input 
                leftIcon={<Fontisto name="email" size={24} color="gray" />}
                placeholder='Email'
                onChangeText={
                    function(currentinput){
                        setEmail(currentinput);
                    }
                }
                ></Input>

                <Input 
                leftIcon={<AntDesign name="tagso" size={24} color="gray" />}
                placeholder='Student Id' 
                onChangeText={
                    function(currentinput){
                        setSid(currentinput);
                    }
                }
                ></Input>
                
                <Input 
                leftIcon={<Feather name="key" size={24} color="gray" />}
                placeholder='Password' 
                secureTextEntry={true}
                onChangeText={
                    function(currentinput){
                        setPassword(currentinput);
                    }
                }
                ></Input>

                <Button
                icon={<FontAwesome name="sign-in" size={24} color="white" />}
                title="  Sign Up"
                type="solid"
                onPress={
                    function(){
                        let currentuser = {
                            name: Name,
                            email: Email,
                            sid: Sid,
                            password: Password,
                            bornon: "Not set yet",
                            livesat: "Not set yet",
                            worksat: "Not set yet",
                        };
                        storeDataJson(Email,currentuser);
                        props.navigation.navigate('SignIn');
                    }
                }
                /> 

                <Button
                title="  Already Signed Up !! "
                type="clear"
                onPress={
                    function(){
                        props.navigation.navigate('SignIn')
                    }
                }
                />

            </Card>
        
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    textStyle:{
        fontSize: 20,
        color: "skyblue",

    },
    textStyle1:{
        fontSize: 30,
        color: "steelblue",
        fontStyle: "italic",
    },
    viewStyle:{
        flex: 1,
        justifyContent:'center',
    },
        imageStyle: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})

export default SignupScreen;
