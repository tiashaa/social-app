import React, { useState ,useEffect} from "react";
import {ImageBackground, SafeAreaView, ScrollView,TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import { Header} from "react-native-elements";
import {getDataJson, getAllindex} from '../functions/AsyncStorageFunctions';
import NotificationComponent from '../components/NotificationComponent';
import { AuthContext } from "../providers/AuthProvider"

const NotificationScreen = (props) => {
  const [Notification, setNotification]=useState([]);
  const [Render, setRender]=useState(false);
  const getNotification = async () =>{
    setRender(true);
    let keys=await getAllindex();
    let Allnotifications=[];
    if(keys!=null){
     for (let k of keys){
          if(k.startsWith("nid#") ){
            let notification= await getDataJson(k);
            Allnotifications.push(notification);
          }
        }
        setNotification(Allnotifications);
       }
      else{
        console.log("No post to show");
      }
       setRender(false);
  }


  useEffect(()=>{
     getNotification();
  },[]);

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
          
          <FlatList
          data={Notification}
          onRefresh={getNotification}
          refreshing={Render}
          renderItem={function({item}){
            if(item.author==auth.CurrentUser.name){
            return(
                  <NotificationComponent title={item} link={props.navigation}/>
            );}
          }}
          keyExtractor={(item, index) => index.toString()}
          >
          </FlatList> 
          
         
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
});

export default NotificationScreen;