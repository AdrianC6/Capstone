import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as LocalAuthentication from 'expo-local-authentication';
import MainMenu from './MainMenu';

export default class AuthWindow extends Component{
  constructor(props){
    super(props);
    this.state ={
      FingerPrintDisabled:false,
      FaceScanDisabled:false,
        authMethod:[]
      };
  }

  componentDidMount(){
    this._CheckAuth()
  }

  _CheckAuth=()=>{
    var Authmethod = this.props.navigation.getParam("authMethod")
    // console.log(this.state.authMethod)
    if(Authmethod.length > 0){
      //console.log(Authmethod)
      if(Authmethod.length == 2) {
        // enable both
        this.setState({FingerPrintDisabled:false,FaceScanDisabled:false});
        //console.log(this.state.FaceScanDisabled)
        //console.log(this.state.FingerPrintDisabled)
      }else if(Authmethod[0] == 2){
        // enable face
        this.setState({FingerPrintDisabled:true, FaceScanDisabled:false});
        //console.log(this.state.FingerPrintDisabled)
      }else if(Authmethod[0] == 1){
        // enable fingers
        this.setState({FingerPrintDisabled:false, FaceScanDisabled:true});
      }
    }else{
      Alert.alert("You dont have either authentication option im sorry but you cant use the app")
      this.setState({FingerPrintDisabled:true, FaceScanDisabled:true});
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{fontSize:25, fontWeight:"bold"}}>Authorization Window</Text>
        <View style={styles.buttons}>
          <Button title="Face Scan" onPress={()=> this.props.navigation.navigate('Face Scan Window')} disabled={this.state.FaceScanDisabled}/>
        </View>
        <View style={styles.buttons}>
          <Button title="Thumb Scan" onPress={() => this.props.navigation.navigate('Thumb Scan Window') } disabled={this.state.FingerPrintDisabled}/>
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
      width:150,
      backgroundColor: '#f7f7f7',
      borderRadius:10
    },
    images:{
      height:300,
      width:300
    }
  });
