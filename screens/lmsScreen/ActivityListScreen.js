import { StyleSheet, Text, View, } from 'react-native'
import React, { useContext, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwaHeader from '../common/SwaHeader'
import { useDispatch, useSelector } from 'react-redux';
import SubIconActivityList from '../common/SubIconActivityList'
import { GlobleData } from '../../Store'
import Services from '../../Services';
import { apiRoot } from '../../constant/ConstentValue';
import BottomDrawerList from '../common/BottomDrawerList';


const ActivityListScreen = ({ navigation, route }) => {


  const { userData } = useContext(GlobleData)
  const moduleActivityList = useSelector(state => state.ActivityToolList)
  const [listItem, setListItem] = useState({ list: null, status: false, type: '' })
  const [chapterID, setChapterID] = useState()
  const bookId = useRef(route.params.item.bookID).current

  

  function onClickLeftIcon() {
    navigation.goBack()
  }
  function onClickRightIcon() {
    setIsInstruction(true)
  }
  async function getModuleActivityData(item, actUrl) {
    setChapterID(item.chapterID)
    const payload = {
      "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? route.params.sendData.classID : userData.data.classID,
      "subjectID": item.subjectID,
      "subTypeID": route.params.sendData.subTypeID,
      "chapterID": item.chapterID?item.chapterID:''
    }

    if (actUrl != "") {
      const cheerio = require('react-native-cheerio');
      const response = await fetch(actUrl + '/app')
      // console.log(JSON.stringify(response), 'checkresponse')

      const htmlString = await response.text()
      // console.log(htmlString, 'htmlString')
      const $ = cheerio.load(htmlString);
      const liListIframe = $("iframe");
      const liListEmbed = $("embed");
      const liListSource = $("source");

      const liList = liListIframe[0] ?? liListSource[0] ?? liListEmbed[0] ?? null;
      let srcPath = '';

      if (liList) {
        const urlArray = liList.attribs.src.split('#');
        if (liList.attribs.src.includes('SPDF')) {
          srcPath = `${urlArray[1]}`
        } else {
          srcPath = `${urlArray[0]}`
        }
        if (srcPath.endsWith('mp4') || srcPath.endsWith('ogg')) {
          // This Video of elearning
          navigation.navigate('videoView',)
        } else if ((bookId == 3 || bookId == 7)) {
          // This PDF of learning without downloadable
          navigation.navigate('pdfView', { url: srcPath, title: item.activityName})
        } else if (srcPath.endsWith('pdf')) {
          navigation.navigate('pdfView', { url: srcPath, title: item.activityName })
        } else {
        // GlossaryMoralSummaryLbdView//
          navigation.navigate('activityView', {url:actUrl, title:item.activityName})
        }
      } else if(actUrl.includes('otherActivity')){
          navigation.navigate('activityView', {url:actUrl, title:item.activityName})
      }else{
        // GlossaryMoralSummaryLbdView//
        navigation.navigate('activityView', {url:actUrl + item.activityUrl, title:item.activityName})
      }
    } else {
      Services.post(apiRoot.getLearningRightToolsList, payload)
        .then((res) => {
          if (res.status == "success"){
            listName = ''
            if (route.params.sendData.subTypeID == 1){
              listName = item.chapterNameLang2
            } else {
              listName = item.chapterName
            }
            setListItem((prev) => {
              return { ...prev, list: res.data.mainData, status: true, type: 'act', imgUrl: res.data.imgUrl, listName: (route.params.sendData.subTypeID == 1 ? "पाठ " : "Chapter ") + item.chapterNo + ': ' + listName, actUrl:actUrl }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  function closeModule(){
    setListItem((prev) =>{
      return {...prev, status: false}
    })
  }
  function getSelectedItem(item, type) {

    const payload = {
      "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? route.params.sendData.classID : userData.data.classID,
      "subjectID": route.params.sendData.subjectID,
      "subTypeID": route.params.sendData.subTypeID,
      "subPartID": item.subPartID,
      "chapterID": chapterID
    }
    Services.post(apiRoot.getFilePathAccToLearningType, payload)
      .then((res) => {
        if (res.status == "success") {
          setListItem((prev) => {
            return { ...prev, status: false }
          })
          if (res.data.length > 1) {
            navigation.navigate('chapterItem')
          } else if (res.data[0]?.uploadFileName?.split('.').pop() === "pdf") {
            navigation.navigate('pdfView', res.data[0])
          } else if (res.data[0]?.uploadFileName?.split('.').pop() === "mp4") {
            navigation.navigate('videoView', res.data[0])
          } else if (res.data[0].activityUrl != null || res.data[0].activityUrl != undefined){
            navigation.navigate('activityView', {url: res.data[0].activityUrl, title: res.data[0].activityName})
          }
        }
      })
  }
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      {/* <SwaHeader title={route.params.sendData.userName} leftIcon={"arrowleft"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon}/> */}
      {!moduleActivityList.loading &&
       <SubIconActivityList selectedModuleItem={route.params.item} toolItems={moduleActivityList.data} getModuleActivityData ={getModuleActivityData} navigation={navigation}/>
      }
      {listItem.status &&
        <BottomDrawerList closeModule={closeModule} listItem={listItem} getSelectedItem={getSelectedItem} languageID={route.params.sendData.subTypeID} />
      }
    </View>
  )
}

export default ActivityListScreen
const styles = StyleSheet.create({})