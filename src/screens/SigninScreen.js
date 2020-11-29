import React, {useState} from 'react';
import {ImageBackground,Text,SafeAreaView, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Fontisto, Feather, FontAwesome  } from '@expo/vector-icons';
import {AuthContext} from '../providers/AuthProvider';
import {getDataJson} from '../functions/AsyncStorageFunctions';


const SigninScreen=(props)=>{
    const [Email, setEmail]=useState("");
    const [Password, setPassword]=useState("");

    return(
        <AuthContext.Consumer>
        {(auth)=>(
        
            
            <Card>
                <Card.Title style={styles.textStyle}>Welcome to <Text style={styles.textStyle1}>The Office</Text></Card.Title>
                <Card.Divider/>
                <Input 
                leftIcon={<Fontisto name="email" size={24} color="gray" />}
                placeholder='Email'
                onChangeText={
                    function(currentinput){
                        setEmail(currentinput);
                    }
                }></Input>
                <Input 
                leftIcon={<Feather name="key" size={24} color="gray" />}
                placeholder='Password' 
                secureTextEntry={true}
                onChangeText={
                    function(currentinput){
                        setPassword(currentinput);
                    }
                }></Input>
                <Button
                icon={<FontAwesome name="sign-in" size={24} color="white" />}
                title="  Sign In"
                type="solid"
                onPress={async function(){
                    let UserData = await getDataJson(Email);
                    if(UserData.password==Password){
                        auth.setIsloggedIn(true);
                        auth.setCurrentUser(UserData);
                    }
                    else{
                        alert("Wrong Email/Password !!");
                    }
                }}
                /> 
                <Button
                title="  Haven't Signed Up !!"
                type="clear"
                onPress={
                    function(){
                        props.navigation.navigate('SignUp')
                    }                    
                }
                />

            </Card>
        
        
        )}
        </AuthContext.Consumer>
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

export default SigninScreen;