import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import SubIconActivityList from './SubIconActivityList'
import SwaHeader from './SwaHeader'
import { SWATheam } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'
import Orientation from 'react-native-orientation-locker';

const ChapterItemList = ({ navigation, route }) => {
  const { userData } = useContext(GlobleData)

  useEffect(() => {
    const goBack = navigation.addListener('focus', () => {
        Orientation.lockToPortrait();
    });
    return goBack
}, [navigation])


  function onClickLeftIcon() {
    navigation.goBack()
  }
  function onClickRightIcon() {
    setIsInstruction(true)
  }
  async function getModuleActivityData(item){
    if(item.subPartID==10003){
      navigation.navigate('videoView', { url: item.siteUrl+item.filePath+'/'+item.uploadFileName, data: item.chapterName})
    }else{
      navigation.navigate('activityView', { url: item.activityUrl, title: item.activityName })
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: userData.data.colors.liteTheme, marginTop: 20}}>
      <SwaHeader title={route.params.sendData.screenName} leftIcon={"arrowleft"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon} />
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 10 }}>
          {route.params.data.map((item, index) => {
            console.log(item, 'check list')
            let iconPath = null
            let iconName = ''
            if(item.subPartID==10003){
              iconPath = require('../assets/video.png')
              iconName = "Video "+ (index+1)
            }else{
              iconPath = require('../assets/pdf.png')
              iconName = "PDF "+ (index+1)
            }
            
            return (
              <TouchableOpacity style={{ height: 160, marginVertical: 10, width: "40%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 9, borderRadius: 6, justifyContent: 'space-around', padding: 8 }} key={item.activityID}
                onPress={() => {
                  getModuleActivityData(item)
                }}>
                <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={iconPath} style={{ height: "100%", width: "100%", borderWidth: 1, resizeMode: "contain", tintColor: userData.data.colors.mainTheme}} />
                </View>
                <View style={{ height: 40, alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: SWATheam.SwaBlack, fontWeight:'500' }}>{iconName}</Text>
                </View>

              </TouchableOpacity>
            )
          })}

        </View>
      </ScrollView>
    </View>
  )
}

export default ChapterItemList

const styles = StyleSheet.create({})