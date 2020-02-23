import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import AuthWindow from "./src/components/AuthWindow"
import MainMenu from "./src/components/MainMenu"
import FaceScan from "./src/components/FaceScan"
import ThumbScan from "./src/components/ThumbScan"
import Code from "./src/components/Code"
import CodeGenerator from  "./src/components/CodeGenerator"
import NewQRScanner from "./src/components/NewQRScanner"
import * as LocalAuthentication from 'expo-local-authentication';


const Navigator = createStackNavigator({
      'Main Menu':{ 
        screen: MainMenu 
      },
      'Auth Window':{ 
        screen: AuthWindow
      },
      'Face Scan Window':{
        screen: FaceScan
      },
      'Thumb Scan Window':{
        screen: ThumbScan
      },
      'Auth Token':{
        screen: NewQRScanner
      },
      'Code Generator':{
        screen: CodeGenerator
      }
  }, 
  { 
      initialRouteName: 'Main Menu'
  }
  );

const AppContainer = createAppContainer(Navigator);
//export default AppContainer;
export default class Screens extends React.Component {
  
    render() {
        return <AppContainer />;
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
