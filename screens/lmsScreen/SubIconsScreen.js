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
import AcademicProfIntro from '../lmsScreen/SEPT/AcademicProfIntro'


const activeSubIconIDs = [18, 45, 94, 20, 47]

const SubIconsScreen = ({ navigation, route }) => {


    const dispatch = useDispatch()
    const { userData } = useContext(GlobleData)
    const [subIconsData, setSubIconsData] = useState({ icons: null, iconUrl: '', status: true, iconName: '' })
    const [selectedIcon, setSelectedIcon] = useState({ name: 'CBSE', subIconID: subIconsData?.icons?.icons[0] })
    const [selectField, setSelectField] = useState(true)
    const [selectedField, setSelectedField] = useState({ class: null, section: null, subject: null, book: null })
    const [listItem, setListItem] = useState({ list: null, status: false, type: '' })
    const [toolItems, setToolItems] = useState()
    const [funBagActivity, setFunBagActivity] = useState({ mainData: null, status: false })
    const [loading, setLoading] = useState(true)
    const [intro, setIntor] = useState({ selectedSubIcon: null, instruction: false })
    const [viewSeptReport, setViewSeptReport] = useState({data:null, status:false})

    const toolName = route.params.getMainIconsData.iconName
    const mainIconID = route.params.mainIconID



    useEffect(() => {
        getSubIcons()
    }, [])
    function getSubIcons() {
        if (mainIconID == 27) {
            setLoading(true)
            const payload = {
                "schoolCode": userData?.data?.schoolCode,
                "academicYear": userData?.data?.academicYear,
                "userTypeID": userData?.data?.userTypeID,
                "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
                "sectionID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.section.sectionID : userData.data.sectionID,
            }
            Services.post(apiRoot.septModules, payload)
                .then((res) => {
                    if (res.status == "success") {
                        setLoading(false)
                        setSubIconsData((prev) => {
                            return { ...prev, icons: res.data, iconUrl: res.data.path, status: false, iconName: "sept" }
                        })
                    }
                })
        } else {
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

        if (val.testID != undefined) {
            if(val.isSeptAttempt!=null){
                setViewSeptReport((prev)=>{
                    return{...prev, data:val, status:true}
                });
                setIntor((prev) => {
                    return { ...prev, selectedSubIcon: val,}
                });
            }else{
                setIntor((prev) => {
                    return { ...prev, selectedSubIcon: val, instruction: true }
                });
                setViewSeptReport((prev)=>{
                    return{...prev, status:false}
                })
            }
        } else if(activeSubIconIDs.includes(val.getSubIconsData.subIconID)){
            setSelectedField({})
            setToolItems()
            setSelectField(true)
            setSelectedIcon((prev) => {
                return { ...prev, name: val.getSubIconsData.subIconName, subIconID: val.getSubIconsData.subIconID }
            });

        }else{
            alert('coming soon!')
        }

    }

    function getSeptReport(item){
        
        if(item.data.testID==1){
            navigation.navigate('septAcademicReport', item.data)
        }else if(item.data.testID==2){
            navigation.navigate('septLearningReport', item.data)
        }else if(item.data.testID==3){
            navigation.navigate('septMultipleIntellReport', item.data)
        }else if(item.data.testID==4){
            navigation.navigate('septKnowingMeReport', item.data)
        }else if(item.data.testID==5){
            navigation.navigate('septBrainDominReport', item.data)
        }
        
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

        const classID = ((userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID)

        let actArr = ['134', '135', '136', '137', '73', '68', '77']

        if (classID == 13) {
            actArr = ['134', '135', '136', '137', '77', '171']
        }
        let pdfact = ['169', '73', '74', '186', '191', '170', '69', '187', '192', '76', '78', '188', '193'];

        const sendData = {
            screenName: selectedField.subject.subjectID == 1 ? item.subjectSubCatLang2 : item.subjectSubCategory.replace('<br>', ''),
            subTypeID: item.subTypeID,
            classID: classID,
            subjectID: selectedField.subject.subjectID
        }
        if ((item.urlLink == 'eLearning' && item.isElearning != 1) || pdfact.includes(item.subTypeID)) {
            if ((item.subTypeID == 73 && classID != 13) || item.subTypeID == 171 || item.subTypeID == 77 || item.subTypeID == 68) {
                const payload = {
                    "classID": classID,
                    "subjectID": item.subjectID,
                    "subTypeID": item.subTypeID,
                    "chapterID": ''
                }
                Services.post(apiRoot.getLearningRightToolsList, payload)
                    .then((res) => {
                        if (res.status == "success") {
                            navigation.navigate('ViewFunBag', { data: res.data, selectItem: item, classID: selectedField })
                        } else {

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
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
                navigation.navigate('activityListScreen', { item: item, sendData: sendData, urlLink: 'swaWithTextbook' })
            }
        } else if (item.urlLink == "bookPDF") {
            const activityPayload = {
                "classID": (userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID,
                "subjectID": item.subjectID,
                "subTypeID": item.subTypeID,
                "bookID": (item.bookID != "" && item.bookID != null) ? item.bookID : "",
                "schoolCode": userData?.data?.schoolCode,
                "academicYear": userData?.data?.academicYear,
                "urlLink": (item.urlLink != "" && item.urlLink != null) ? item.urlLink : ""
            }
            Services.post(apiRoot.getModuleActivityData, activityPayload)
                .then((res) => {

                    if (res.status == "success") {
                        navigation.navigate('pdfView', { url: res.data.mainData[0].filePath + res.data.mainData[0].uploadFileName, title: res.data.mainData[0].chapterName, urlLink: 'bookPDF' })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {

                })
        }
        else {
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
            navigation.navigate('activityListScreen', { item: item, sendData: sendData, urlLink: 'swaWithTextbook' })
        }
    }

    function getAttemptedScreen(testID, testName) {
        const classID = ((userData?.data?.userTypeID == 4) || (userData?.data?.userTypeID == 2) ? selectedField.class.classID : userData.data.classID)
        navigation.navigate('septAttempt', {classID:classID, testID:testID, testData:intro, schoolCode:userData?.data?.schoolCode,})
                


        
        

        
    }

    return (
        <>
            {loading ?
                <Loader /> :
                <>
                    <View style={{ marginTop: 20, backgroundColor: userData.data.colors.liteTheme }}>
                        <SwaHeader title={toolName} leftIcon={"arrowleft"} onClickLeftIcon={onClickLeftIcon} onClickRightIcon={onClickRightIcon} />
                        <IconsContainer deshboardData={subIconsData} getIconDetail={getIconDetail} type={"subIcon"} selectSubIcon={intro} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                        {viewSeptReport.status?
                        <View style={{flexDirection:'row', backgroundColor:SWATheam.SwaWhite, margin:10, padding:10, borderRadius:10, elevation:7, justifyContent:"center", alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{color:SWATheam.SwaBlack}}>{viewSeptReport.data.testType}</Text>
                        </View>
                            <TouchableOpacity style={{backgroundColor:userData.data.colors.mainTheme, alignSelf:'center', padding:6, borderRadius:6, marginLeft:20}}
                            onPress={()=>getSeptReport(viewSeptReport)}
                            >
                                <Text style={{color:SWATheam.SwaWhite}}>View Report</Text>
                            </TouchableOpacity>
                        </View>:
                        <>
                        {selectedIcon.name == "CBSE" || selectedIcon.name == 'NCERT' ?
                            (
                                <>
                                    {(selectField && mainIconID != 27) &&
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
                                    {mainIconID != 27 &&
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                                onPress={() => setSelectField(!selectField)}>
                                                <AntDesign name={selectField ? "upcircle" : "downcircle"} size={32} color={userData.data.colors.mainTheme} />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </>
                            ) :
                            null
                        }

                        </>
                        }
                        
                        
                        {listItem.status &&
                            <BottomDrawerList closeModule={closeModule} listItem={listItem} getSelectedItem ={getSelectedItem} selectedField = {selectedField}/>
                        }
                    </View>
                    {intro.instruction ?
                        <AcademicProfIntro getAttemptedScreen={getAttemptedScreen} intro={intro} /> :

                        <View style={{ flex: 1, backgroundColor: userData.data.colors.liteTheme }}>
                            <ScrollView>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 10}}>
                                    {toolItems?.mainData.map((item, index) => {
                                        let toolName = ''
                                        if (selectedField.subject.subjectID == 1) {
                                            toolName = item.subjectSubCatLang2.replace('<br>', '')
                                        } else {
                                            toolName = item.subjectSubCategory.replace('<br>', '')
                                        }
                                        return (
                                            <TouchableOpacity style={{ height: 160, marginVertical: 10, width: "40%", justifyContent: 'center', alignItems: 'center', backgroundColor: SWATheam.SwaWhite, elevation: 9, borderRadius: 6, justifyContent: 'space-around', padding: 8 }} key={item.subTypeID}
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
                    }
                </>

            }
        </>
    )
}

export default SubIconsScreen

const styles = StyleSheet.create({})