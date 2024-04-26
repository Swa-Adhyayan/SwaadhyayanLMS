import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SWATheam } from '../../constant/ConstentValue'
import { GlobleData } from '../../Store'

const SubIconActivityList = ({ navigation, toolItems, getModuleActivityData, selectedModuleItem}) => {
    console.log(toolItems, 'if funData')


    const { userData } = useContext(GlobleData)
    return (
        <View style={{ flex: 1, backgroundColor: userData.data.colors.liteTheme }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 10 }}>
                {toolItems?.mainData.map((item, index) => {
                let listKey = ''
                let baseUrl = ''
                let iconUrl = ''
                let iconName = ""
                let chapActUrl = ""
                if(selectedModuleItem?.urlLink!=null && selectedModuleItem?.urlLink!=""){
                    if(item.chapterName!=null ||item.chapterName!=undefined){
                        listKey = item.chapterID
                        iconUrl = item.chapterName.chapterIcon
                        baseUrl = toolItems.chapterImg
                        iconName = ''
                        
                    }else{
                        listKey = item.subTypeID
                        iconUrl = index+1+'.png'
                        baseUrl = toolItems.activityImg
                        iconName = item.activityName
                    }
                }else{
                    listKey = item.chapterID
                    iconUrl = item?.chapterIcon
                    baseUrl = toolItems.chapterImg
                    iconName = ''
                }
                if(selectedModuleItem?.urlLink!=null||item.chapterName!=null){ 
                    
                        chapActUrl = `https://swaadhyayan.com/data/e-Learning/activities/${item.activityUrl}/Unit-${item.chapterNo}.pdf`;
                }
                        return (
                            <TouchableOpacity style={{ height: 160, marginVertical: 10, width: "40%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 9, borderRadius: 6, justifyContent: 'space-around', padding: 8 }} key={index}
                                onPress={() => {
                                    let actUrl = ''
                                    if((toolItems.activityUrl!=null || toolItems.activityUrl!=undefined) && item.htmlUrl == "VirtualTour"){
                                        actUrl=item.activityPath
                                    }else if(toolItems.activityUrl!=null || toolItems.activityUrl!=undefined){
                                        actUrl = toolItems.activityUrl
                                    }
                                    // if(item.htmlUrl=="VirtualTour"){
                                    //     actUrl=item.activityPath
                                    // }
                                    getModuleActivityData(item, actUrl, chapActUrl, selectedModuleItem.subTypeID, navigation)
                                    }}>
                                <View style={{ height: item.subTypeID != undefined ? 80 : 144, width: item.subTypeID != undefined ? 80 : 90, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image source={{ uri: baseUrl + iconUrl}} style={{ height: "100%", width: "100%", borderWidth: 1, resizeMode: "contain" }} />
                                </View>
                                {iconName!=''&&
                                    <View style={{ height: 40, alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: SWATheam.SwaGray }}>{iconName}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default SubIconActivityList
const styles = StyleSheet.create({})