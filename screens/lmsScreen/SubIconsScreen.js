import { SafeAreaView, StyleSheet, Text, View, Platform, TouchableOpacity, Animated, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react';
import SwaHeader from '../common/SwaHeader'
import IconsContainer from '../common/IconsContainer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GlobleData } from '../../Store'
import Services from '../../Services'
import { SWATheam, apiRoot } from '../../constant/ConstentValue'
import SelectionBox from '../common/SelectionBox'
import BottomDrawerList from '../common/BottomDrawerList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLearningTool } from '../redux/slices/LearningToolList';
import { fetModuleActivityList } from '../redux/slices/ModuleActivityList';
import Loader from '../common/Loader';
import SubIconActivityList from '../common/SubIconActivityList';



const SubIconsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { userData } = useContext(GlobleData)
    const [subIconsData, setSubIconsData] = useState({ icons: null, iconUrl: '', status: true })
    const [selectedIcon, setSelectedIcon] = useState({ name: 'CBSE', subIconID: subIconsData?.icons?.icons[0] })
    const [selectField, setSelectField] = useState(true)
    const [selectedField, setSelectedField] = useState({ class: null, section: null, subject: null, book: null })
    const [listItem, setListItem] = useState({ list: null, status: false, type: '' })
    const [toolItems, setToolItems] = useState()
    const [funBagActivity, setFunBagActivity] = useState({mainData:null, status:false})
    const [loading, setLoading] = useState(true)

    const urlName = route.params.getMainIconsData.iconName
    const mainIconID = route.params.mainIconID



    useEffect(() => {
        getSubIcons()
    }, [])
    function getSubIcons() {
        const subIconPayload = {
            "userRefID": userData?.data?.userRefID,
            "schoolCode": userData?.data?.schoolCode,
            "academicYear": userData?.data?.academicYear,
            "userTypeID": userData?.data?.userTypeID,
            "mainIconID": mainIconID
        }
        Services.post(apiRoot.appSubIcons, subIconPayload)
            .then((res) => {
                if (res.status == "success") {
                    setLoading(false)
                    setSubIconsData((prev) => {
                        return { ...prev, icons: res.data, iconUrl: res.data.domain, status: false }
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
            })
    }
    function onClickLeftIcon() {
        navigation.goBack()
    }
    function onClickRightIcon() {
        setIsInstruction(true)
    }
    function closeModule() {
        setListItem((prev) => {
            return { ...prev, status: false }
        })
    }

    function getIconDetail(val) {
        setSelectedField({})
        setToolItems()
        setSelectField(true)
        setSelectedIcon((prev) => {
            return { ...prev, name: val.getSubIconsData.subIconName, subIconID: val.getSubIconsData.subIconID }
        });

    }

    function getListItem(type) {
        if (type == "class") {
            setLoading(true)
            const classPayload = {
                "schoolCode": userData?.data?.schoolCode,
                "userTypeID": userData?.data?.userTypeID
            }
            if (userData.data.userTypeID == 4) {
                classPayload["academicYear"] = userData?.data?.academicYear,
                    classPayload["userRefID"] = userData?.data?.userRefID
            }
            Services.post(apiRoot.getClassList, classPayload)
                .then((res) => {
                    if (res.status == "success") {
                        setListItem((prev) => {
                            return { ...prev, list: res.data, status: true, type: type }
                        });
                        setLoading(false)

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (type == "section") {
            setLoading(true)
            if (selectedField.class == null) {
                alert('Please select class.')
            } else {
                const sectionPayload = {
                    "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
                    "schoolCode": userData?.data?.schoolCode,
                    "userTypeID": userData?.data?.userTypeID,
                    "userRefID": userData?.data?.userRefID,
                    "academicYear": userData?.data?.academicYear
                }
                Services.post(apiRoot.getSectionList, sectionPayload)
                    .then((res) => {
                        if (res.status == "success") {
                            setListItem((prev) => {
                                return { ...prev, list: res.data, status: true, type: type }
                            });
                            setLoading(false)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        } else if (type == "subject") {
            setLoading(true)
            const subjectPayload = {
                "schoolCode": userData?.data?.schoolCode,
                "userTypeID": userData?.data?.userTypeID,
                "academicYear": userData?.data?.academicYear,
                "userRefID": userData?.data?.userRefID,
                "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
                "sectionID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.section.sectionID : userData.data.sectionID,
            }
            Services.post(apiRoot.getSubjectList, subjectPayload)
                .then((res) => {
                    if (res.status == 'success') {
                        setListItem((prev) => {
                            return { ...prev, list: res.data, status: true, type: type }
                        });
                        setLoading(false)

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)

                })
        } else if (type == "book") {
            setLoading(true)
            const bookPayload = {
                "schoolCode": userData?.data?.schoolCode,
                "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
                "subjectID": selectedField?.subject?.subjectID,
                "isAssess": ""
            }
            Services.post(apiRoot.getBooksList, bookPayload)
                .then((res) => {
                    if (res.status == "success") {
                        setListItem((prev) => {
                            return { ...prev, list: res.data, status: true, type: type }
                        });
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }

    }

    function getSelectedItem(item, type) {
        console.log(item ,' item')
        if (type == "class") {
            setSelectedField((prev) => {
                return { ...prev, class: item, section: null, subject: null, book: null }
            })
            setListItem((prev) => {
                return { ...prev, status: false }
            })
            setToolItems()
        } else if (type == "section") {
            setSelectedField((prev) => {
                return { ...prev, section: item, subject: null, book: null }
            })
            setListItem((prev) => {
                return { ...prev, status: false }
            })
            setToolItems()

        } else if (type == "subject") {
            setSelectedField((prev) => {
                return { ...prev, subject: item, book: null }
            })
            setListItem((prev) => {
                return { ...prev, status: false }
            })
            setToolItems()
        } else if (type == "book") {
            setSelectedField((prev) => {
                return { ...prev, book: item }
            })
            setListItem((prev) => {
                return { ...prev, status: false }
            })
            getLearningToolsList(item.subjectID)
        }else if(type=='act'){
            alert('hello')
        }
    }

    function getLearningToolsList(item) {
        setLoading(true)
        const toolsPayload = {
            "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
            "subjectID": selectedField.subject.subjectID,
            "bookID": item,
            "userTypeID": userData?.data?.userTypeID
        }
        dispatch(fetchLearningTool(toolsPayload))
        Services.post(apiRoot.getLearningToolsList, toolsPayload)
            .then((res) => {
                if (res.status == "success") {
                    setToolItems(res.data)
                    setSelectField(false)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    function getModuleActivityData(item, navigation) {
        console.log(item, 'check item')
        const classID = ((userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID)

        let actArr = ['134', '135', '136', '137', '73', '68', '77']

        if (classID == 13) {
            actArr = ['134', '135', '136', '137', '77', '171']
        }
        let pdfact = ['169', '73', '74', '186', '191', '170', '69', '187', '192', '76', '78', '188', '193'];

        const sendData = {
            userName: selectedField.subject.subjectID == 1 ? item.subjectSubCatLang2 : item.subjectSubCategory.replace('<br>', ''),
            subTypeID: item.subTypeID,
            classID: classID,
            subjectID: selectedField.subject.subjectID
        }
        if (actArr.includes(item.subTypeID)) {
            console.log('funbag')
            navigation.navigate('ViewFunBag', { ...sendData, userName: item.subjectLang })
        } else if ((item.urlLink == 'eLearning' && item.isElearning != 1) || pdfact.includes(item.subTypeID)) {
            if ((item.subTypeID == 73 && classID != 13) || item.subTypeID == 171 || item.subTypeID == 77 || item.subTypeID == 68){
                const payload = {
                    "classID": classID,
                    "subjectID": item.subjectID,
                    "subTypeID": item.subTypeID,
                    "chapterID": ''
                }
                Services.post(apiRoot.getLearningRightToolsList, payload)
                    .then((res) => {
                        if (res.status == "success") {
                            navigation.navigate('ViewFunBag', {data:res.data, selectItem:item, classID:selectedField} )
                            // setListItem((prev) => {
                            //     return { ...prev, list: res.data.mainData, status: true, type: 'act', imgUrl: res.data.imgUrl, listName: selectedField.subject.subjectID == 1 ? item.subjectSubCatLang2 : item.subjectSubCategory.replace('<br>', ''),rootName:"funBagView", subTypeID:item.subTypeID}
                            // })
                        }else{
                            
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                // navigation.navigate('ViewFunBag', {...sendData, userName:item.subjectLang})
            } else {
                alert('hello')
                navigation.navigate('activityListScreen', {item:item, sendData:sendData, urlLink:'eLearning'})
            }
        } else if (item.urlLink == "bookPDF") {
            console.log('activity no NEP')
            navigation.navigate('pdfView', { urlLink: 'bookPDF' })
        } else {
            console.log('activity no Activity')
            navigation.navigate('activityListScreen', { item: item, sendData: sendData, urlLink: 'swaWithTextbook' })
        }
        const activityPayload = {
            "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
            "subjectID": item.subjectID,
            "subTypeID": item.subTypeID,
            "bookID": (item.bookID != "" && item.bookID != null) ? item.bookID : "",
            "schoolCode": userData?.data?.schoolCode,
            "academicYear": userData?.data?.academicYear,
            "urlLink": (item.urlLink != "" && item.urlLink != null) ? item.urlLink : ""
        }
        dispatch(fetModuleActivityList(activityPayload))
       }

       function getFunBagActivity(item, suTypeID){
        
        const payload = {
            "classID"   : (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
            "subjectID" : selectedField.subject.subjectID,
            "subTypeID" : suTypeID,
            "subPartID" : item.subPartID,
            "chapterID" : ""
        }
        Services.post(apiRoot.getFilePathAccToLearningType, payload)
        .then((res)=>{
            if(res.status=="success"){
                navigation.navigate('activityListScreen', {item:res.data, route:'funBag'})
                
            }
        })
       }

    return (
        <>
            {loading ?
                <Loader /> :
                <>
                    <View style={{ marginTop: 20, backgroundColor: userData.data.colors.liteTheme }}>
                        <SwaHeader title={urlName} leftIcon={"arrowleft"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon} />
                        <IconsContainer deshboardData={subIconsData} getIconDetail={getIconDetail} type={"subIcon"} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                        {selectedIcon.name == "CBSE" || selectedIcon.name == 'NCERT' ?
                            (
                                <>
                                    {selectField &&
                                        <View style={{ padding: 10, }}>
                                            {userData.data.userTypeID == 4 || userData.data.userTypeID == 2 ?
                                                (
                                                    <>
                                                        <SelectionBox getListItem={getListItem} selectedField={selectedField?.class?.getClassDetail?.classDesc} type="class" placeholder="Select class" />
                                                        <SelectionBox getListItem={getListItem} selectedField={selectedField?.section?.sectionName} type="section" placeholder="Select section" />
                                                    </>
                                                ) :
                                                null
                                            }
                                            <SelectionBox getListItem={getListItem} selectedField={selectedField?.subject?.subjectName} type="subject" placeholder="Select subject" />
                                            <SelectionBox getListItem={getListItem} selectedField={selectedField?.book?.bookName} type="book" placeholder="Select book" />
                                        </View>
                                    }
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={() => setSelectField(!selectField)}>
                                            <AntDesign name={selectField ? "upcircle" : "downcircle"} size={32} color={userData.data.colors.mainTheme} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ):
                            null
                        }
                        {listItem.status &&
                            <BottomDrawerList closeModule={closeModule} listItem={listItem} getSelectedItem={getSelectedItem} getFunBagActivity={getFunBagActivity} selectedField={selectedField} />
                        }
                    </View>
                    <View style={{ flex: 1, backgroundColor: userData.data.colors.liteTheme }}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 10 }}>
                                {toolItems?.mainData.map((item, index) => {
                                    toolName = ''
                                    if (selectedField.subject.subjectID == 1) {
                                        toolName = item.subjectSubCatLang2.replace('<br>', '')
                                    } else {
                                        toolName = item.subjectSubCategory.replace('<br>', '')
                                    }
                                    return (
                                        <TouchableOpacity style={{ height: 160, marginVertical: 10, width: "40%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 9, borderRadius: 6, justifyContent: 'space-around', padding: 8 }} key={item.subTypeID}
                                            onPress={() => getModuleActivityData(item, navigation)}>
                                            <View style={{ height: item.subTypeID != undefined ? 80 : 144, width: item.subTypeID != undefined ? 80 : 90, justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={{ uri: toolItems?.imgUrl + item?.iconName }} style={{ height: "100%", width: "100%", borderWidth: 1, resizeMode: "contain" }} />
                                            </View>
                                            {item.subTypeID != undefined &&
                                                <View style={{ height: 40, alignItems: 'center' }}>
                                                    <Text style={{ textAlign: 'center', color: SWATheam.SwaGray }}>{toolName}</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    {/* {funBagActivity.status&&
                   <SubIconActivityList toolItems={funBagActivity} getModuleActivityData={getModuleActivityData} navigation={navigation}/>
                    } */}
                </>

            }
        </>
    )
}

export default SubIconsScreen

const styles = StyleSheet.create({})