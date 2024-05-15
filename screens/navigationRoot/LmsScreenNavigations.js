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
import SeptAttempt from '../lmsScreen/SEPT/SeptAttempt'
import AcademicReport from '../lmsScreen/SEPT/septReport/AcademicReport'
import LearningReport from '../lmsScreen/SEPT/septReport/LearningReport'
import MultipleIntellReport from '../lmsScreen/SEPT/septReport/MultipleIntellReport'
import KnowingMeReport from '../lmsScreen/SEPT/septReport/KnowingMeReport'
import BrainDominReport from '../lmsScreen/SEPT/septReport/BrainDominReport'
import TimeTable from '../lmsScreen/TimeTable'
import EditProfile from '../userScreens/EditProfile'
import GameViewer from '../common/GameViewer'

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
      <Stack.Screen name = "videoView" component={VideoView} options={{headerShown:false}}/>
      <Stack.Screen name = "septAttempt" component={SeptAttempt} options={{headerShown:false}}/>
      <Stack.Screen name = "gameView" component={GameViewer} options={{headerShown:false}}/>
      {/* report */}
      <Stack.Screen name = "septAcademicReport" component={AcademicReport} options={{headerShown:false}}/>
      <Stack.Screen name = "septLearningReport" component={LearningReport} options={{headerShown:false}}/>
      <Stack.Screen name = "septMultipleIntellReport" component={MultipleIntellReport} options={{headerShown:false}}/>
      <Stack.Screen name = "septKnowingMeReport" component={KnowingMeReport} options={{headerShown:false}}/>
      <Stack.Screen name = "septBrainDominReport" component={BrainDominReport} options={{headerShown:false}}/>
      {/* report */}
      {/* timeTable */}
      <Stack.Screen name = "timeTable" component={TimeTable} options={{headerShown:false}}/>
      <Stack.Screen name="editProfile" component={EditProfile} options={{headerShown:false}}/>
      {/* timeTable */}
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