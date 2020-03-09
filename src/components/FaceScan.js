import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, ScrollView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default class FaceScan extends Component{
  constructor(props){
    super(props);
    this.state ={
      authenticated:false,
      modalVisible:false,
      failedAttempt:0
    };
  }

  componentDidMount(){
    this._hasLocalAuth()
  }

  _hasLocalAuth=()=>{
    let localAuth = LocalAuthentication.isEnrolledAsync()
    console.log(localAuth)
  }
   
  /*
    Checks to see if the user is authenticated after scanning user's face
    if successful they continue to the next screen
    if failed they are alerted to that
  */
  _authenticate=async()=>{
    try{
      let auth = await LocalAuthentication.authenticateAsync()
      if (auth.success) {
        this.setState({modalVisible: false, authenticated: true, failedAttempt: 0,});
        this.props.navigation.navigate('Auth Token')
      } else {
        this.setState({failedCount: this.state.failedCount + 1,});
        this._message();
      }
    } catch (e) {
      console.log(e);
    }
  }

  _message=()=>{
    alert('You are not authenticated‽');
  }

  render(){
  return(
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={{fontSize:25, fontWeight:"bold", padding:10}}>Face Scan Window</Text>
        <Text style={styles.description}>On this screen you will use the phones integrated face scanning system when prompted so you can gain access to the next page</Text>
        <Image style={styles.images} source={require('C:\\Users\\Adrian\\Desktop\\Face-Off\\Images\\facescan.png')}/>
        <View style={styles.buttons}>
          <Button title="Start Scan" onPress={() => this._authenticate()}/>
        </View>
      </View>
    </ScrollView>
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
      position:"absolute",
      height:40,
      width:130,
      margin:620,
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