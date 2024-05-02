import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { GlobleData } from '../Store'
import { SWATheam } from '../constant/ConstentValue'

const Notification = () => {
  const {userData} = useContext(GlobleData)
  return (
    <View style={{flex:1, backgroundColor:userData.data.colors.liteTheme, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:18, fontWeight:'500', textAlign:'center', color:SWATheam.SwaBlack}}>(Notification) coming soon!</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})