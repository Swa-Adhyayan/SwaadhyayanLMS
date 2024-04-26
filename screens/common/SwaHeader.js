import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SWATheam } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'
const {width, height} = Dimensions.get('window')

const SwaHeader = ({title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon}) => {
  const {userData} = useContext(GlobleData)
  return (
    <View style={[styles.header, styles.shadowProp,{backgroundColor:userData?.data?.colors?.mainTheme,}]}>
      <TouchableOpacity style={styles.btn}
      onPress={()=>onClickLeftIcon()}
      >
      <AntDesign name={leftIcon} size={30} color={SWATheam.SwaWhite}/>
      </TouchableOpacity>
      <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
        <Text style={{fontWeight:'bold', color:SWATheam.SwaWhite, textAlign:'center'}}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.btn}
      onPress={()=>onClickRightIcon()}
      >
      <AntDesign name={rightIcon} size={25} color={SWATheam.SwaWhite}/>
      </TouchableOpacity>
    </View>
  )
}

export default SwaHeader

const styles = StyleSheet.create({
  header:{
    width:width,
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    // marginTop:Platform.OS === 'android'?24:0,
    padding:6,
    elevation:9
    },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
    btn:{
        width:40,
        justifyContent:'center',
        alignItems:'center',
    }
})