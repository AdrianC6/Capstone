import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

export default class BarcodeScannerExample extends Component {
  state = {
    hasCameraPermission: null,
    secret:''
  }

  async UNSAFE_componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
      console.log(this.state.secret)
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
        <View style={{flex:1}}>
            <View style={{width: 500 , height:500}}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />
            </View>
            <View style={{marginTop:30}}>
                <Button title="Code Generator Screen" onPress={()=> this.props.navigation.navigate('Code Generator', this.state)} />
            </View>
        </View>
    );
  }

    // PrintSecret =()=>{
    //     console.log(this.state.secret)
    // }   

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    var regex = /=([A-Za-z0-9]*)&/;
    var Secret = String(regex.exec(data)[1])
    //console.log(Secret);
    this.setState({secret:Secret})
  }


}