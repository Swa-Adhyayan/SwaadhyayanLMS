import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'
import { SWATheam } from '../../constant/ConstentValue'

const WelcomeScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
          navigation.navigate("splash")
        }, 2000)
        const goBack = navigation.addListener('focus', () => {
          setTimeout(()=>{
            navigation.navigate('splash')
        }, 2000)
        });
        return goBack
        }, [])
  return (
    <View style={{flex:1, backgroundColor:SWATheam.SwaBlue, justifyContent:'center', alignItems:'center'}}>
      <Image source={require('../assets/SW_Logo.png')}/>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})