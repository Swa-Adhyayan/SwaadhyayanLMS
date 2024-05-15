import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
import React, { useContext, useState, useEffect} from 'react'
import { GlobleData } from '../../Store'
import { SWATheam, apiRoot } from '../../constant/ConstentValue'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker';
import Services from '../../Services';
import Loader from '../common/Loader';


const Profile = ({navigation}) => {
  const {userData, logOut} = useContext(GlobleData)
  const[isModalVisible, setIsModalVisible] = useState(false)
  const [profileData, setProfileData] = useState({data:null, path:''})

  

  useEffect(()=>{
    getProfileData();
    const goBack = navigation.addListener('focus', () => {
      getProfileData();
  });
  return goBack
  },[navigation])
  

  function getProfileData(){
    const payload = {
      "userRefID": userData?.data?.userRefID,
      "userTypeID": userData?.data?.userTypeID,
      "schoolCode" : userData?.data?.schoolCode
    }
    if(userData?.data?.userTypeID==5||userData?.data?.userTypeID==6){
      payload["transYear"]=userData?.data?.transYear
    }
    Services.post(apiRoot.getProfileData, payload)
    .then((res)=>{
      console.log(res, 'check profile Data')
      if(res.status=="success"){
        setProfileData((prev)=>{
          return{...prev, data:res.data, path:res.data.profilePath}
        })
      }
    }).catch((err)=>{
      console.log(err, 'error')
    })
    .finally(()=>{
    })
  }
  
  const toggleModal = ()=>{
    setIsModalVisible(!isModalVisible)
  }

  const takePhotoFromCamera=()=>{
    ImagePicker.openCamera({
      width: 410,
      height: 410,
      cropping: true,
      compressImageQuality:0.7
    }).then(image => {
      const formData = new FormData();
        formData.append("userRefID", userData.data.userRefID);
        formData.append("userTypeID", userData.data.userTypeID);
        formData.append("schoolCode", userData.data.schoolCode);
        formData.append("profilePhoto", {
          uri:image.path,
          name:'image.png',
          fileName:'image',
          type:'image/png'
        });
        if(userData.data.userTypeID==5||userData.data.userTypeID==6){
          formData.append("transYear", userData.data.transYear);
        }
      Services.formMethod(apiRoot.updateProfilePhoto, formData)
      .then((res)=>{
        console.log(res, 'camera take photo')
        if(res.status=="success"){
          setProfileData((prev)=>{
            return{...prev, path:res.path}
          });
          getProfileData()
          setIsModalVisible(false)
        }
      })
    })
    .catch((err)=>{
      console.log(err, 'hari')
    });
  }
  const choosePhotoFromLibrary=()=>{
    ImagePicker.openPicker({
      width: 410,
      height: 410,
      cropping: true,
      compressImageQuality:0.7
    }).then(image => {
      const formData = new FormData();
        formData.append("userRefID", userData.data.userRefID);
        formData.append("userTypeID", userData.data.userTypeID);
        formData.append("schoolCode", userData.data.schoolCode);
        formData.append("profilePhoto", {
          uri:image.path,
          name:'image.png',
          fileName:'image',
          type:'image/png'
        });
        if(userData.data.userTypeID==5||userData.data.userTypeID==6){
          formData.append("transYear", userData.data.transYear);
        }
      Services.formMethod(apiRoot.updateProfilePhoto, formData)
      .then((res)=>{
        console.log(res, 'library')
        if(res.status=="success"){
          setProfileData((prev)=>{
            return{...prev, path:res.path}
          });
          setIsModalVisible(false)
        }
      })
    })
    .catch((err)=>{
      console.log(err, 'error')
    })
    ;
  }
  console.log(profileData, 'profileData')


  return (
    <>
    {profileData.data==undefined?
    <Loader/>:
    <View style={{ flex: 1, backgroundColor: userData.data.colors.liteTheme, }}>
      <View style={{ height: 250, justifyContent: 'flex-end', alignItems: 'center' }}>
      <TouchableOpacity style={{position:'absolute', width:40, height:40, borderRadius:50, backgroundColor:userData.data.colors.mainTheme, justifyContent:'center', alignItems:'center',right:20, top:40, padding:4}}
      onPress ={()=> navigation.navigate('editProfile', profileData)}
      >
        <AntDesign name={"edit"} size={20} color={userData.data.colors.liteTheme}/>
      </TouchableOpacity>

        <TouchableOpacity style={{position:'absolute', zIndex:1, height:42, width:42, borderRadius:50, backgroundColor:userData.data.colors.mainTheme, bottom:-20, justifyContent:"center", alignItems:'center', borderWidth:.7, borderColor:SWATheam.SwaWhite}}
        onPress={toggleModal}
        >
        <AntDesign name={"camera"} size={24} color={SWATheam.SwaWhite}/>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}
                animationInTiming={300}
                animationOutTiming={900}
                style={{width:'100%', margin:0}}
                >
                  <TouchableOpacity style={{flex:1,}} onPress={toggleModal}/>
                <View style={{ height:'40%', backgroundColor:'#ffff',borderTopRightRadius:10, borderTopLeftRadius:10, padding:10 }}>
                <View style={{ backgroundColor: SWATheam.SwaLightGray, width: 30, height: 6, borderRadius: 4, alignSelf: 'center', marginVertical:10}}></View>
                  <View style={{marginVertical:15, }}>
                    <Text style={{fontSize:18, alignSelf:'center', fontWeight:'500', color:'#000'}}>Upload Photo</Text>
                    <Text style={{alignSelf:'center', color:SWATheam.SwaGray}}>Choose your profile picture</Text>
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity
                        style={{width:'60%',padding:10, borderRadius:6, backgroundColor:userData.data.colors.mainTheme, marginBottom:10}}
                        onPress={takePhotoFromCamera}
                        >
                      <Text style={{textAlign:'center', color:SWATheam.SwaWhite}}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width:'60%',padding:10, borderRadius:6, backgroundColor:userData.data.colors.mainTheme, marginBottom:10}}
                        onPress={choosePhotoFromLibrary}
                        >
                      <Text style={{textAlign:'center', color:SWATheam.SwaWhite}}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width:'60%',padding:10, borderRadius:6, backgroundColor:userData.data.colors.mainTheme, marginBottom:10}}
                        onPress={toggleModal}>
                      <Text style={{textAlign:'center', color:SWATheam.SwaWhite}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal>


        <View style={{ height: 120, width: 120, borderRadius: 100, borderWidth: 5, overflow: 'hidden', borderColor: SWATheam.SwaWhite, backgroundColor: SWATheam.SwaWhite, elevation: 9 }}>
          <Image source={{ uri:profileData.path}} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
        </View>
      </View>

      <View style={{marginTop:20}}>
        <Text style={{ padding: 4, textAlign: 'center', marginTop: 10, fontSize: 15, fontWeight: '500', color: SWATheam.SwaBlack, textTransform: 'capitalize' }}>{profileData.data.fullName}</Text>
        {profileData.data.userTypeID == 5 || profileData.data.userTypeID==6?
        <Text style={{ textAlign: 'center', color: SWATheam.SwaBlack, textTransform: 'capitalize'}}>Class: {profileData.data.className+'-'+profileData.data.sectionName}</Text>:null
        }
        <Text style={{ textAlign: 'center', color: SWATheam.SwaBlack, textTransform: 'capitalize', marginTop:4}}>{profileData.data.userTypeName}</Text>

      </View>

      <View style={{ backgroundColor: SWATheam.SwaWhite, padding: 10, borderRadius: 6, margin: 20, elevation: 9}}>
      

        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <View style={{padding: 4, width: 110, marginRight: 4}}>
            <Text style={{color: SWATheam.SwaBlack, fontWeight: '500'}}>School Name:</Text>
          </View>
          <View style={{padding: 4, flex: 1}}>
            <Text style={{color: SWATheam.SwaBlack}}>{profileData.data.schoolName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <View style={{ padding: 4, width: 110, marginRight: 4 }}>
            <Text style={{ color: SWATheam.SwaBlack, fontWeight: '500' }}>E-mail:</Text>
          </View>
          <View style={{ padding: 4, flex: 1 }}>
            <Text style={{ color: SWATheam.SwaBlack }}>{profileData.data.emailID}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <View style={{padding: 4, width: 110, marginRight: 4}}>
            <Text style={{color: SWATheam.SwaBlack, fontWeight: '500'}}>Contact:</Text>
          </View>
          <View style={{padding: 4, flex: 1}}>
            <Text style={{color: SWATheam.SwaBlack}}>{profileData.data.userTypeID == 5 || profileData.data.userTypeID==6?profileData.data.fatherContact:profileData.data.contactNo}</Text>
          </View>
        </View>

      </View>

      <TouchableOpacity style={{ padding: 10, marginHorizontal: 20, backgroundColor: userData.data.colors.mainTheme, borderRadius: 6 }}
      onPress={()=>logOut()}
      >
        <Text style={{ textAlign: 'center', color: SWATheam.SwaWhite, fontWeight: '500' }}>Log Out</Text>
      </TouchableOpacity>

    </View>
    }

    </>
  )
}

export default Profile

const styles = StyleSheet.create({})