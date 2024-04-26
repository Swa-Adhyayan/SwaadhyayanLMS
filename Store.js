import { StyleSheet, Text, View } from 'react-native';
import React,{useState, useEffect} from 'react';
import Services from './Services';
import { apiRoot, baseURL } from './constant/ConstentValue';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GlobleData = React.createContext()

export default function Store({children}){
  const [userData, setUserData] = useState({data:null, message:'', isLogin:false})

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
        navigation.navigate('home')
      }else if(res.status=="error"){
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
  return (
    <GlobleData.Provider value = {{login, userData}}>
      {children}
    </GlobleData.Provider>
  )
}

const styles = StyleSheet.create({})