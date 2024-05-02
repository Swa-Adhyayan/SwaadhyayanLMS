import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Lottie from 'lottie-react-native';
import { RSARTheam } from '../../constant/Index';


const VideoLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <Lottie source={require('../assets/ani.json')}
        autoPlay loop
        style={styles.animationStyle}
      />
    {/* <Text style={{color: RSARTheam.rSRed, textAlign: 'center' }}>Loading...</Text> */}
    </View>
  )
}

export default VideoLoader

const styles = StyleSheet.create({
    mainContainer:{
        flex:1, justifyContent:'center',alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        position:'absolute', top:0, bottom:0, left:0, right:0 ,
        zIndex:999
      },
      animationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    
      },
      animationStyle: {
        width: 150,
        height: 150,
        alignSelf: 'center'
      }
})