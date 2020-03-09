import React, { Component} from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import {createDigest, createRandomBytes} from "@otplib/plugin-crypto-js";
import {  Authenticator } from '@otplib/core';
import { keyDecoder, keyEncoder } from '@otplib/plugin-thirty-two'

export default class CodeGenerator extends Component{
    constructor(props){
      super(props);
      this.state ={
            QRSecret:'',
            currentCode:'',
            currentCodes:[],
            timeLeft:'',
            counter:0,
            Issuer:'',
            Issuers:[],
            Secrets:[
              {
                issuer: '',
                secret: ''
              }
            ]

      };
    }
  
    componentDidMount(){
      this.setSecret() 
    }

    //sets the secrets taken from the QR codes
    setSecret=()=>{
      //takes the secret from previous screen and sets it to the state of QRSecret
      var thing =this.props.navigation.getParam("secret").toUpperCase();
      var thing2 =this.props.navigation.getParam("issuer")
      // console.log(thing2)
        // let mymap = new Map()
        // mymap.set(thing2,thing)
        // let keys = Array.from(mymap.keys())
        // let values = Array.from(mymap.values())
        // console.log( `${keys} ${values}`)
        // AsyncStorage.getItem("data").then(value=>JSON.parse(value)).then(value=>{
          // if(value == null){
          //   value = [];
          // }
         let issuers = {Issuer: thing2, secret: thing};
        this.setState({QRSecret:thing, Issuer:thing2, Issuers:issuers},() =>{
          //Retrieve data from Async to make sure all codes are taken into account
          AsyncStorage.getItem("data").then(value => {
            if(!value){
              value={
                list: []
              };
              value.list.push(this.state.QRSecret);
            }else{
              value = JSON.parse(value);
              if(!value.list.includes(this.state.Issuers) && !this.state.QRSecret=="")
              {
                console.log(this.state.Issuers)
                if(this.state.Issuers.Issuer != ''){
                  value.list.push(this.state.Issuers);
                }
              }
            }
            // console.log("This is what I want",value.list)
            //sets the array list to the list of secrets
            this.setState({Secrets: value.list})
          }).then(() =>{
            //save the whole updated list
            AsyncStorage.setItem("data", JSON.stringify({list: this.state.Secrets})).then(() => {this.doThing()});
          }).done();})
  
        // })
    }

    //Goes through all the secrets and passes them so we can make TOTP codes
    doThing(){
      var list = this.state.Secrets
      this.setState({currentCodes:[]})
      for(let i = 0; i < list.length; i++){
        if(list[i].Issuer == ""){
          //console.log("splicing the list",list[i])
          list.splice(i,1)
        }
      }
      this.setState({Secrets:list}, () => { /*console.log(this.state.Secrets)*/
      })
      for(let i = 0; i < this.state.Secrets.length; i++)
      {
        this.generateCode(this.state.Secrets[i].secret);
      }
      //console.log(this.state.Secrets)
    }

    //Creates TOTP codes based off of QR secret
    generateCode=(secret)=>{
      const authenticator = new Authenticator({
        createDigest,
        createRandomBytes,
        keyDecoder,
        keyEncoder
      });
        setInterval(() => {
            var token = authenticator.generate(secret);
            var tokens = this.state.currentCodes;
            if(!tokens.includes(token)){
              tokens.push(token);
            }
            var time = authenticator.timeRemaining()
            this.setState({currentCodes:tokens, currentCode:token, timeLeft:time})
            if(time <= 1){
              this.setState({currentCodes:[]})
            }
        }, 1000);
    }

    async deleteItem (index){
      let list = JSON.parse(JSON.stringify(this.state.Secrets))
      list.splice(index,1);
      let codes = this.state.currentCodes;
      //console.log(`codes: ${codes}`)
      codes.splice(index,1);
      // list.secret.splice(index,1);
      //console.log(list.splice(index,1))
      await this.setState({Secrets:list, currentCodes:codes},() => {AsyncStorage.setItem("data", JSON.stringify({list: this.state.Secrets}))});
      // await this.setState({currentCodes:codes});
  }
  render(){
      let pns = []
      for(let i = 0; i < this.state.Secrets.length; i++)
      {
        // console.log('yes:',this.state.Secrets.length)
        // console.log(`this: ${this.state.currentCodes.length}`)
        // console.log(i)
        pns.push(<View key={i} style={{flexDirection:"row", flex:1, width:300}}>
      <Text style={{fontSize:20, padding: 10}}>{this.state.Secrets[i].Issuer} : {this.state.currentCodes[i]}</Text>
          <Text style={{fontSize:10, padding:10}}>{this.state.timeLeft}</Text>
          <Button
                            style={{flex:2, alignContent:"right"}}
                            onPress={()=>{this.deleteItem(i)}}
                            title="Delete"
                        />
        </View>)
      }
        return(
            <View style={styles.container}>
                <Text style={{fontSize:25, fontWeight:"bold", padding: 10}}>Code</Text>
                <View>
                  {pns}
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