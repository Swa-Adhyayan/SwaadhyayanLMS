import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { SWATheam } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'
import Entypo from 'react-native-vector-icons/Entypo'
const { height, width } = Dimensions.get('window');

const IconsContainer = ({deshboardData, getIconDetail, type, selectedIcon}) => {
    const {userData} = useContext(GlobleData)
  return (
    <View style={{ height: 120, backgroundColor: userData?.data?.colors?.mainTheme, flexDirection: 'row'}}>
        <View style={{ padding: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Entypo name="chevron-left" color="white" size={20}/>
        </View>
        <View style={{ flex: 1, }}>
          <ScrollView horizontal contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            {deshboardData?.icons?.icons.map((item, index) => {
              return (
                <TouchableOpacity style={{height: '100%', width: (width - 56) / 3}} key={type=="mainIcon"?item.mainIconID:item.subIconID}
                onPress={()=>{
                      if(type=='subIcon'){
                        getIconDetail(item)
                      }else{
                        getIconDetail(item)
                      }
                      }
                  
                  }>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 75, width: 75, borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 8, borderWidth: 0, borderColor: userData?.data?.colors.hoverTheme , backgroundColor:(item?.getSubIconsData?.subIconName===selectedIcon?.name && item?.getSubIconsData?.subIconName!=undefined) || (item?.getSubIconsData?.subIconID===selectedIcon?.subIconID && item?.getSubIconsData?.subIconID!=undefined) && (type=='subIcon')?userData.data.colors.hoverTheme:null}}>
                      <Image source={{ uri: deshboardData?.iconUrl + item?.iconData?.iconPath + item?.iconData?.iconImage }} style={{ height: '100%', width: "100%" }} />
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 2, height: 30 }}>
                    <Text style={{ textAlign: 'center', color: SWATheam.SwaWhite }}>{item?.iconData?.iconName?.length > 12 ? item?.iconData?.iconName.substring(0, 10) + '...' : item?.iconData?.iconName}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={{padding: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Entypo name="chevron-right" color="white" size={20}/>
        </View>
      </View>
  )
}

export default IconsContainer

const styles = StyleSheet.create({})