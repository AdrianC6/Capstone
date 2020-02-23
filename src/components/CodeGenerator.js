import React, { Component} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {createDigest, createRandomBytes} from "@otplib/plugin-crypto-js";
import {  Authenticator } from '@otplib/core';
import { keyDecoder, keyEncoder } from '@otplib/plugin-thirty-two'
//import OTP from 'otp-client'
//import Authenticator from '@otplib/authenticator'
//import { createStackNavigator } from "react-navigation-stack";
//import { createAppContainer } from "react-navigation";
//import * as Crypto from "expo-crypto";
//import * as Auth from '@otplib/core'

export default class CodeGenerator extends Component{
    constructor(props){
      super(props);
      this.state ={
            QRSecret:'',
            currentCode:'',
            previousCode:'',
            nextCode:'',
            timeLeft:'',
            otp:{},
            counter:0
      };
    }
  
    componentDidMount(){
        this.setSecret()
    }

    setSecret=()=>{
      var thing =this.props.navigation.getParam("secret").toUpperCase();
      this.setState({QRSecret:thing}, this.generateCode())        
    }

    generateCode=()=>{
      //const secret = '2lwhgz7y7kqg7rzf'.toUpperCase();
      console.log(typeof createDigest)
      const authenticator = new Authenticator({
        createDigest,
        createRandomBytes,
        keyDecoder,
        keyEncoder
      });
        setInterval(() => {
            var token = authenticator.generate(this.state.QRSecret);
            var time = authenticator.timeRemaining()
            this.setState({currentCode:token, timeLeft:time})
        }, 1000);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:25, fontWeight:"bold", padding: 10}}>Code</Text>
                <Text style={{flexDirection:"column", flex:1, fontSize:20, padding: 10}}>{this.state.currentCode}</Text>
                <Text style={{flexDirection:"column", flex:1, fontSize:10, padding:10}}>{this.state.timeLeft}</Text>
            </View>
        );
    }
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#259b9a',
        alignItems: 'center',
        // justifyContent: 'center',
      },
      description:{
        flex:0.5,
        padding:10,
        fontSize:20,
      },
      buttons:{
        margin:620,
        position:"absolute",
        height:40,
        width:130,
        backgroundColor: '#f7f7f7',
        borderRadius:10
      },
      images:{
        position:"absolute",
        margin:220,
        height:300,
        width:300
      },
      scroll:{
        backgroundColor: '#259b9a',
      }
    });