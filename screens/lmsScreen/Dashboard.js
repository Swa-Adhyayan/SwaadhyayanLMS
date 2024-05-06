import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import SwaHeader from '../common/SwaHeader'
import Entypo from 'react-native-vector-icons/Entypo'
import Services from '../../Services'
import { SWATheam, apiRoot } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'
import IconsContainer from '../common/IconsContainer'
import Loader from '../common/Loader'



// Time table  16,32,36 //

const Dashboard = ({ navigation, route }) => {
  const { userData } = useContext(GlobleData)
  console.log(JSON.stringify(userData), 'userData')

  const [deshboardData, setDeshboardData] = useState({ icons: null, timeTable: null, iconUrl: '', status:true })
  const [timeTableStructure, setTimeTableStructure] = useState();

  const activeMainIconIds = [4,17,28,36,27]
  const timeTable = [16,32,36]

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let currentDay = new Date()
  const dayname = weekDays[currentDay.getDay()]

  useEffect(() => {
    appDashboard()
  }, [])

  function appDashboard() {
    const dashboardPayload = {
      "userRefID": userData?.data?.userRefID,
      "schoolCode": userData?.data?.schoolCode,
      "academicYear": userData?.data?.academicYear,
      "userTypeID": userData?.data?.userTypeID
    }
    if(userData.data.userType == "student"){
      dashboardPayload["classID"] = userData.data.classID,
      dashboardPayload["sectionID"] = userData.data.sectionID
    }
        Services.post(apiRoot.appDashboard, dashboardPayload)
          .then((res) => {
            if (res.status == "success") {
              renderTimeTable(res.data.timeTable)
              setDeshboardData((prev) => {
                return { ...prev, icons: res.data.dashIcons, timeTable: res.data.timeTable, iconUrl: res.data.dashIcons.domain, status:false }
              })

            }
          })
          .catch((error) => {
            console.log(error,)
          })
          .finally(() => {

          })
  }

  function renderTimeTable(data) {   
    
    const structure = data.structure.structure.split(',');
    const tableSturcture = [];
    
    structure.map((item, key) => {
      
      const cellSturcture = item.split('_');
      let cellHeading = '';
      let count = 1
      if (cellSturcture[1] == 'BR') {
        cellHeading = 'Break';
      } else if (cellSturcture[1] == 'PR') {
        cellHeading = 'Prayer';
      } else if (cellSturcture[1] == 'PD') {
        cellHeading = 'Period ' + count;
        count++
      } else if (cellSturcture[1] == 'EP') {
        cellHeading = 'Extra Period';
      } else if (cellSturcture[1] == 'ZP') {
        cellHeading = 'Zero Period';
      } else if (cellSturcture[1] == 'RC') {  
        cellHeading = 'Recess';
      }
      tableSturcture[key] = { 'periodSeq' : (key+1),'heading' : cellHeading,};
    });   

    const structureData = data.assignedData;
    const cellData = [];
    let dataIndex = 0;
    structureData.map((item, key) => {
      const currentDay = new Date().getDay();
      const data = item.cellData.split('|');
      const dayData = data[0].split('_');
      const periodData = data[1].split('_');
      if (currentDay == dayData[1]) {
        const teacherName = item.firstName + (item.middleName != null ? ' ' + item.middleName + ' ' : ' ') + (item.lastName != null ? item.lastName : '');
        const subjectName = item.subjectName;
        cellData[dataIndex] = { 'teacherName': teacherName, 
          'subjectName': subjectName, 
          'periodSeq': periodData[1], 
          'dayName': weekDays[currentDay] 
        };
        
        if( item.className != undefined ) {
          cellData[dataIndex] = { 'teacherName': teacherName, 
              'subjectName': subjectName, 
              'periodSeq': periodData[1],
              'dayName': weekDays[currentDay], 
              'className' : item.className , 
              'sectionName' : item.sectionName 
          }
        } else {
          cellData[dataIndex] = { 'teacherName': teacherName, 
            'subjectName': subjectName, 
            'periodSeq': periodData[1],
            'dayName': weekDays[currentDay]  
          } 
        }
        dataIndex++;
      }
    });
    const tableData = [];
    for( let i = 0; i< tableSturcture.length; i++ ) {
      const tempObj = {};
      const tableHeading = tableSturcture[i]['heading'];
      for ( let j = 0; j < cellData.length; j++ ) {
        tempObj['head'] = tableHeading;
        if( tableSturcture[i].periodSeq == cellData[j].periodSeq ) {
          tempObj['body'] = cellData[j];
        } 
      }
      if( tableHeading == 'Prayer' || tableHeading == 'Recess' || tableHeading == 'Break' ) {
        tempObj['veritcalBody'] = tableHeading.split( '' );
      }
      tableData[i] = tempObj;
    }
    setTimeTableStructure(tableData);
  }

  function onClickLeftIcon() {
    navigation.openDrawer()
  }
  function onClickRightIcon() {
    setIsInstruction(true)
  }
  function getIconDetail(item){
    console.log(item, 'mainIcons Details')
    if(activeMainIconIds.includes(item.getMainIconsData.mainIconID)){
      navigation.navigate("subIconScreen", item)
    }else if(timeTable.includes(item.iconData.iconID)){
      navigation.navigate('timeTable', item)

    }else{
      alert('coming soon!')
    }
  }
  


  return (
    <>
    {deshboardData.status?
    <Loader/>:
    <View style={{ flex: 1, marginTop: 20, backgroundColor: userData?.data?.colors.liteTheme }}>
      <SwaHeader title={'Swa-Adhyayan LMS'} leftIcon={"bars"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon} />
      <IconsContainer deshboardData={deshboardData} getIconDetail = {getIconDetail} type={"mainIcon"}/>
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <View style={{}}>
          <View style={{ backgroundColor: userData?.data?.colors?.mainTheme, padding: 8, borderRightWidth:1, borderLeftWidth:1, borderColor: userData?.data?.colors.hoverTheme }}>
            <Text style={{ textAlign: 'center', color: SWATheam.SwaWhite, fontWeight:'bold', textTransform:'uppercase'}}> {dayname} Time Table</Text>
          </View>
            <ScrollView horizontal>
          <View style={{ flexDirection: 'row'}}>
              {timeTableStructure?.map((item, index) => {
                let headText = ''
                if (item.head == "Prayer" || item.head == "Recess" || item.head == "Break") {
                  headText = ""
                } else {
                  headText = item.head
                }                
               
                
                return (
                  <View key={index}>
                    {item.head == "Prayer" || item.head == "Recess" || item.head == "Break" ?
                      <>
                        <View style={{ width: 40, paddingVertical:5, backgroundColor: userData?.data?.colors?.mainTheme, borderWidth: 1, borderColor: userData?.data?.colors.hoverTheme}}>
                          <Text style={{padding: 4, textAlign: 'center', color: SWATheam.SwaWhite, fontWeight: "500"}}>{headText}</Text>
                        </View>
                      </>:
                      <>
                        {
                          timeTableStructure.length <= 3 ?
                            <>
                              <View style={{ flex: 1, paddingVertical:5, backgroundColor: userData?.data?.colors?.mainTheme, borderWidth: 1, borderColor: userData?.data?.colors.hoverTheme }}>
                                <Text style={{ padding: 4, textAlign: 'center', color: SWATheam.SwaWhite, fontWeight: "500" }}>{headText}</Text>
                              </View>
                            </> :
                            <>
                              <View style={{ width: 180, paddingVertical:5, backgroundColor: userData?.data?.colors?.mainTheme, borderWidth: 1, borderColor: userData?.data?.colors.hoverTheme }}>
                                <Text style={{ padding: 4, textAlign: 'center', color: SWATheam.SwaWhite, fontWeight: "500" }}>{headText}</Text>
                              </View>
                            </>
                        }
                      </>
                    }
                    <View style={{backgroundColor:SWATheam.SwaWhite, borderWidth:1, borderColor: userData?.data?.colors.hoverTheme, height:145, justifyContent:'center', alignItems:'center', padding:4}}>
                    {
                      item?.veritcalBody?.map( (verticalData, index) =>{
                        return(
                          <View style={{justifyContent:'center', alignItems:'center'}} key={index}>
                            <Text style={{textTransform:'uppercase', color:userData?.data?.colors.mainTheme}}>{verticalData}</Text>
                          </View>
                        )
                      })
                    }
                    {
                      item?.body &&
                      <View style={{}}>
                        <Text style={{textAlign:'center', color:SWATheam.SwaGray,}}>{item.body.subjectName}</Text>
                        {userData.data.userTypeID==4?
                        <Text style={{textAlign:'center', color:SWATheam.SwaGray}}>{item.body.className} - {item.body.sectionName}</Text>:
                        <Text style={{textAlign:'center', color:SWATheam.SwaGray}}>{item.body.teacherName}</Text>
                        }
                      </View>
                    }
                    </View>
                  </View>
                )
              })}
          </View>
            </ScrollView>
        </View>
      </View>
    </View>
    }
    </>
  )
}
export default Dashboard

const styles = StyleSheet.create({})