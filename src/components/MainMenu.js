import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as LocalAuthentication from 'expo-local-authentication';

//import AuthWindow from "./src/components/AuthWindow"

export default class MainMenu extends Component {
    constructor(props){
      super(props);
      this.state ={
            authMethod:[],
            // "infoPlist":{
            //   "NSFaceIDUsageDescription": "it needs the face scan to authenticate"
            // }
      };
      
  }

  componentDidMount(){
    this._GetAuth();
  }

  _GetAuth=async()=>{
    LocalAuthentication.hasHardwareAsync();
    let AuthMethod = await LocalAuthentication.supportedAuthenticationTypesAsync();
    //console.log(AuthMethod)
    this.setState({authMethod:AuthMethod});
    // console.log(this.state.authMethod)
  }

  render(){
  
    return (
      <View style={styles.container}>
         <Text style={{fontSize:25,fontWeight:"bold"}}>Capstone Project</Text>
         <Image style={styles.images} source={require('C:\\Users\\Adrian\\Desktop\\Face-Off\\Images\\cybersecurity.png')} />
         <View style={styles.buttons}>
           <Button 
             title="Auth Page"
             onPress={() => this.props.navigation.navigate('Auth Window', this.state)}
         />
         </View>
       </View>
    );
  }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#259b9a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons:{
      margin: 20,
      height:40,
      width:100,
      backgroundColor: '#f7f7f7',
      borderRadius:10
    },
    images:{
      height:300,
      width:300
    }
  });
  