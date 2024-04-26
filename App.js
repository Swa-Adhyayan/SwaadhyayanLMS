import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Store from './Store'
import MainRoot from './MainRoot'
import { Provider } from 'react-redux'
import ReduxStore from './screens/redux/ReduxStore'


const App = () => {
  return (
    <Store>
    <Provider store={ReduxStore}>
      <MainRoot/>
    </Provider>
    </Store>
  )
}
export default App
const styles = StyleSheet.create({})