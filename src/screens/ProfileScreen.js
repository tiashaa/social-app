import React, { useState,useEffect } from "react";
import { ImageBackground,View, ScrollView, StyleSheet, AsyncStorage,FlatList,Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import {getDataJson, getAllindex, removeData} from '../functions/AsyncStorageFunctions';
import PostlistComponent from "../components/PostlistComponent";
import { AuthContext } from "../providers/AuthProvider";


const ProfileScreen = (props) => {

  const [Post, setPost]=useState([]);
  const [Render, setRender]=useState(false);

  const deleteprofile =async (name,email) =>
  {
      let flag=false
      let index=await getAllindex();
      if(index!=null){
        for(let i of index){
          if(i.endsWith(name)){
            await removeData((i));
          }
        }
      }
      await removeData((email));
      return flag;
  }

  const getPost = async () =>{
    setRender(true);
    let keys=await getAllindex();
    let Allposts=[];
    if(keys!=null){
      for (let k of keys){
          if(k.startsWith("pid#")){
            let post= await getDataJson(k);
            Allposts.push(post);
          }
        }
        setPost(Allposts);
      }
      else{
        console.log("No post to show");
      }
      setRender(false);
    }

  useEffect(()=>{
    getPost();
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
          

         
            <Card>
            
            <Text style={styles.textStyle2}> {auth.CurrentUser.name}   </Text>  
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
            <Button
              type="solid"
              title=" Edit Account "
              icon={<FontAwesome5 name="user-edit" size={24} color="white" />}
              onPress={
                function(){
                    props.navigation.navigate('EditProfile');
                }
            }
            />
            <Button 
              type="solid" 
              title=" Delete Account "
              icon={<FontAwesome5 name="user-times" size={24} color="white" />}
              onPress={async()=>{
                let del =await deleteprofile (auth.CurrentUser.name,auth.CurrentUser.email);
                if(del==false){
                  alert("User Removed Successfully");
                  auth.setIsloggedIn(false);
                  auth.setCurrentUser({});
              }
              else{
                  alert("Delete action unsuccessful");
              }}
              }
              />


            </View>         
            <Text style={styles.textStyle1}>  Born On : {auth.CurrentUser.bornon}</Text>
            <Text style={styles.textStyle1}>  Lives At : {auth.CurrentUser.livesat}</Text>
            <Text style={styles.textStyle1}>  Works At : {auth.CurrentUser.worksat}</Text>     
          </Card>

          <FlatList
          data={Post}
          onRefresh={getPost}
          refreshing={Render}
          renderItem={function({item}){
            if(item.uname==auth.CurrentUser.name){
            return(
              <PostlistComponent title={item} user={auth.CurrentUser}
              />
            );
            }
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
  marginBottom: 20,
  fontStyle: "italic"
},
imageStyle1:{
  height: 120,
  width: 85,
  alignSelf: 'center',
  marginTop: 40,
},
});

export default ProfileScreen;