import React from 'react';
import { StyleSheet, View} from 'react-native';
import {AuthContext} from '../Provider/AuthProvider'
import{Button} from 'react-native-elements'





const HomeScreen = (props)=>{
    return(
        <AuthContext.Consumer>
        {(auth)=>(<View>
            <Text>
                "Hello"
            </Text>

            <Button>
                Type: outline
                Title: "log out"
                onPress={function (){auth.Isloggedin(false);}}
            </Button>
        </View>)}

        
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
export default HomeScreen