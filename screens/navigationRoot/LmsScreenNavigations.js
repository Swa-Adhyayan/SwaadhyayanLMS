import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SwaDrawer from '../common/SwaDrawer'
import BottomScreenNavigation from './BottomScreenNavigation'
import SubIconsScreen from '../lmsScreen/SubIconsScreen'
import ActivityListScreen from '../lmsScreen/ActivityListScreen'
import PdfViewer from '../common/PdfViewer'
import ChapterItemList from '../common/ChapterItemList'
import ActivityView from '../common/ActivityView'
import VideoView from '../common/VideoView'
import ViewFunBagScreen from '../lmsScreen/ViewFunBagScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const LmsScreenNavigations = ({navigation, route}) => {
  
return (
    <Stack.Navigator>
      <Stack.Screen name = "home" component={DrawerNavigation} options={{headerShown:false}}/>
      <Stack.Screen name = "subIconScreen" component={SubIconsScreen} options={{headerShown:false}}/>
      <Stack.Screen name = "activityListScreen" component={ActivityListScreen} options={{headerShown:false}}/>
      <Stack.Screen name = "ViewFunBag" component={ViewFunBagScreen} options={{headerShown:false}}/>
      <Stack.Screen name = "pdfView" component={PdfViewer} options={{headerShown:false,}}/>
      <Stack.Screen name = "chapterItem" component={ChapterItemList} options={{headerShown:false}}/>
      <Stack.Screen name = "activityView" component={ActivityView} options={{headerShown:false}}/>
      <Stack.Screen name = "videoView" component={VideoView} options={{headerShown:true}}/>
    </Stack.Navigator>
  )
}
export default LmsScreenNavigations
const DrawerNavigation = ({navigation, route}) => {
    return(
        <Drawer.Navigator drawerContent={props => <SwaDrawer{...props}/>}>
            <Drawer.Screen name="bottomTab" component={BottomScreenNavigation} options={{headerShown:false}}/>
        </Drawer.Navigator>
    )
}