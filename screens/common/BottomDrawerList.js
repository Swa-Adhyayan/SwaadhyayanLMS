import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SWATheam } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'



const BottomDrawerList = ({ closeModule, listItem, type, getSelectedItem, selectedField, navigation, languageID, suTypeID }) => {
  const {userData} = useContext(GlobleData)

  let ListName = ''
  if (listItem.type == "class") {
    ListName = "Class List"
  } else if (listItem.type == "section") {
    ListName = "Section List"
  } else if (listItem.type == "subject") {
    ListName = "Subject List"
  } else if (listItem.type == "book") {
    ListName = "Book List"
  }else if(listItem.type=="act"){
    ListName = listItem.listName.length>30?listItem.listName.substring(0,30) + '...':listItem.listName
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
    >
      <View style={styles.garyContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => closeModule()}
        />

        <View style={styles.listBox}>
          <View style={{ backgroundColor: SWATheam.SwaLightGray, width: 30, height: 6, borderRadius: 4, alignSelf: 'center' }}></View>
          <View style={{ flexDirection: 'row', marginVertical: 10, borderBottomWidth: 1.5, borderColor: SWATheam.SwaLightGray, paddingVertical: 10 }}>
            <Text style={{ padding: 4, width: 40, }}></Text>
            <Text style={{ padding: 4, flex: 1, textAlign: 'center', fontWeight: 'bold', color: SWATheam.SwaBlack, fontSize: 15 }}>{ListName}</Text>

            <TouchableOpacity style={{ padding: 4, width: 40 }}
              onPress={() => closeModule()}>
              <Ionicons name="close" size={20} color={SWATheam.SwaGray}/>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {listItem.type == 'act'?
              (
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around',marginVertical:10, paddingHorizontal:10,}}>
                  {listItem.list.map((item, index) =>{
                    let iconName = ''
                    if(languageID==1){
                      iconName=item.subPartNameLang2
                    }else{
                      iconName=item.subPartName
                    }
                    return (
                      <TouchableOpacity style={{ height: 140, marginVertical: 10, width: "40%", justifyContent: 'center', alignItems: 'center', backgroundColor: userData.data.colors.liteTheme, borderRadius: 6, justifyContent: 'space-around', padding: 8 }} key={item.subPartID}
                            onPress={() =>{
                                getSelectedItem(item, navigation)

                            }
                            }>
                            <View style={{ height:80, width: 80, justifyContent: 'center', alignItems: 'center', }}>
                              <Image source={{ uri: listItem?.imgUrl + item.uploadIcon }} style={{ height: "100%", width: "100%", borderWidth: 1, resizeMode: "contain" }} />
                            </View>
                            <View style={{ height: 40, alignItems: 'center', }}>
                              <Text style={{ textAlign: 'center', color: SWATheam.SwaBlack }}>{iconName}</Text>
                            </View>
                          </TouchableOpacity>
                    )})
                  }
                  </View>
                ) :
              (<>
                {listItem.list.map((item, index) => {
                  let printValue = "";
                  let listKeys = ''
                  let listItemId = ''
                  if (listItem.type == "class") {
                    printValue = item.getClassDetail.classDesc
                    listKeys = item.classID
                    listItemId = selectedField?.class?.classID
                  } else if (listItem.type == "section") {
                    printValue = item.sectionName
                    listKeys = item.sectionID
                    listItemId = selectedField?.section?.sectionID
                  } else if (listItem.type == "subject") {
                    printValue = item.subjectName
                    listKeys = item.subjectID
                    listItemId = selectedField?.subject?.subjectID
                  } else if (listItem.type == "book") {
                    printValue = item.bookName
                    listKeys = item.bookID
                    listItemId = selectedField?.book?.bookID
                  }
                  let clsName = 'radio-button-off'
                  if (listItemId == listKeys) {
                    clsName = 'radio-button-on'
                  }
                  return (
                    
                    <TouchableOpacity
                          key={listKeys}
                          onPress={() => { getSelectedItem(item, listItem.type) }}
                          style={styles.selectItemContainer}>
                          <View style={styles.radioBox}>
                            <Ionicons name={clsName} color={SWATheam.SwaBlue} size={20} />
                          </View>
                          <Text style={{ color: SWATheam.SwaGray }}>{printValue}</Text>
                        </TouchableOpacity>
                    

                  )})}
              </>
              )
            }

          </ScrollView>
        </View>
        {/* <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => closePopup()}
        /> */}
      </View>
    </Modal>
  )
}

export default BottomDrawerList

const styles = StyleSheet.create({
  garyContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  listBox: {
    backgroundColor: SWATheam.SwaWhite,
    maxHeight: '60%',
    minHeight: 50,
    width: "100%",
    alignSelf: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  selectItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderBottomWidth: .7,
    borderColor: SWATheam.SwaGray,
    paddingVertical: 6,
    paddingHorizontal: 6,

  },
  radioBox: {
    paddingHorizontal: 10,

  },
})