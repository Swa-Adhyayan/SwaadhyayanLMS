import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React,{useState, useEffect} from 'react';
import Services from './Services';
import { SWATheam, apiRoot, baseURL } from './constant/ConstentValue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMsg from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MsgModal from './screens/common/MsgModal';
export const GlobleData = React.createContext()

export default function Store({children}){
  const [userData, setUserData] = useState({data:null, message:'', isLogin:false})
  const [msgModalVisible, setMsgModalVisible] = useState({msg:'', status:false, type:''})

  useEffect(()=>{
    checkLogin()
  },[])

  // ----------------- check login function start --------------------//
  async function checkLogin(){
    const loginUserData = await AsyncStorage.getItem("logedInUserdata")
    if(loginUserData !=null){
      const fData = JSON.parse(loginUserData)
      setUserData((prev)=>{
        return{...prev, data:fData.data, isLogin:true}
      })
    }
  }
  // ----------------- check login function end --------------------//



// --------------- login function start --------------- //
  async function login(data, userType, navigation){
    const payload = {
      "userName":data.userId
    }
    if(userType==1){
      payload["password"]=data.password
    }
    Services.post(apiRoot.appLogin, payload)
    .then((res)=>{
      if(res.status=="success"){
        AsyncStorage
        .setItem("logedInUserdata", JSON.stringify(res))
        .then((res)=> console.log("Done"))
        .catch((err)=>{console.log(err)})
        setUserData((prev)=>{
          return{...prev, data:res.data, isLogin:true}
        })
        setMsgModalVisible((prev)=>{
          return{...prev, msg:"Login Successful.", status:true, type:'success'}
        })
        setTimeout(()=>{
          setMsgModalVisible((prev)=>{
            return{...prev, status:false}
          })
        },1500)
        navigation.navigate('home')
      }else if(res.status=="error"){
        setMsgModalVisible((prev)=>{
          return{...prev, msg:res.message, status:true, type:'error'}
        })
        setTimeout(()=>{
          setMsgModalVisible((prev)=>{
            return{...prev, status:false}
          })
        },1500)
        setUserData((prev)=>{
          return{...prev, message:res.message}
        })
      }
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
    })
    
  }
  // ---------------- login function end --------------- //
   // --------------- logout function start -------------//
   function logOut(navigation) {
    AsyncStorage.removeItem('logedInUserdata')
    setUserData((prev)=>{
      return{...prev, data:null, isLogin:false}
    })
  }
   // --------------- logout function end -------------//
  return (
    <>
    <GlobleData.Provider value = {{login, logOut, userData}}>
      {children}
    </GlobleData.Provider>
      <MsgModal msgModalVisible={msgModalVisible} />
     </>
  )
}

const styles = StyleSheet.create({})