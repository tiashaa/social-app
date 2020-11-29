import React, { useState,useEffect } from "react";
import { ImageBackground,View, ScrollView, StyleSheet, AsyncStorage,Image } from "react-native";
import { Text, Card, Button, Avatar, Header,Input } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import {storeDataJson, mergeData, removeData} from '../functions/AsyncStorageFunctions';
import { AuthContext } from "../providers/AuthProvider";

const EditProfileScreen = (props) => { 
const [Bornon, setBornon]=useState("");
const [Livesat, setLivesat]=useState("");
const [Worksat, setWorksat]=useState("");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
            <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" ,fontSize: 20} }}         
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsloggedIn(false);
                auth.setCurrentUser({});
              },
            }}/>
         
            <Card >
            
            <Text style={styles.textStyle2}> {auth.CurrentUser.name}   </Text>  
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
            </View>  
            <Card.Divider/>      
            <Input 
                placeholder='Born On'
                onChangeText={
                    function(currentinput){
                        setBornon(currentinput);
                    }
                }
                ></Input>

                <Input 
                placeholder='Lives At' 
                onChangeText={
                    function(currentinput){
                        setLivesat(currentinput);
                    }
                }
                ></Input>
                
                <Input 
                placeholder='Works At' 
                onChangeText={
                    function(currentinput){
                        setWorksat(currentinput);
                    }
                }
                ></Input> 

                <Button
              type="solid"
              title=" Edit Account "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
              onPress={   
                async function(){
                await mergeData(auth.CurrentUser.email,JSON.stringify({
                    bornon: Bornon,
                    livesat: Livesat,
                    worksat: Worksat,
                }))
                alert("Please logout first and then log in again to see the update :) ");
                }
            }
            />

          </Card>
          
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center"
},
textStyle1:{
  fontSize: 20,
  color: 'black',
  marginLeft: 10,
  marginRight: 10,
  marginTop:10,
},
textStyle2:{
  fontSize: 20,
  color: 'black',
  alignSelf: 'center',
  marginTop:10,
  fontStyle: "italic"
},
imageStyle1:{
  height: 200,
  width: 160,
  alignSelf: 'center',
  marginTop: 40,
},
});

export default EditProfileScreen;
