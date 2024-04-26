import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwaHeader from './SwaHeader'
import { WebView } from 'react-native-webview';

const ActivityView = ({navigation, route}) => {
    function onClickLeftIcon() {
        navigation.goBack()
    }
    function onClickRightIcon() {   
        setIsInstruction(true)
    }
  return (
    <View style={{flex:1, backgroundColor:'green', marginTop:20}}>
    <SwaHeader title={route.params.title} leftIcon={"arrowleft"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon}/>
      <WebView
        source = {{uri:route.params.url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{flex:1}}
      />
    </View>
  )
}

export default ActivityView

const styles = StyleSheet.create({})