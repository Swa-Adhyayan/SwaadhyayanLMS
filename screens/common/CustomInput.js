import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {SWATheam} from '../../constant/ConstentValue';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

    const CustomInput = ({ placeHolder,value, defaultValue, onChangeText, maxLength, icon, secureTextEntry, inputName, checkMail}) =>{
    const [secure, setSecure] = useState(secureTextEntry)
    
    return (
        <View style={{ borderWidth: 1, borderColor: SWATheam.SwaBorder, borderRadius: 4, flexDirection: 'row'}}>
            <TextInput
                value={value}
                defaultValue={defaultValue}
                placeholder={placeHolder}
                onChangeText={onChangeText}
                maxLength={maxLength}
                secureTextEntry={secure}
                placeholderTextColor={SWATheam.SwaGray}
                style={{height: 40, flex: 1}}/>
            {inputName == "password" && 
                <TouchableOpacity style={{width: 40, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {setSecure(!secure)}}>
                    <Ionicons name={secure?icon:"eye-outline"} color={SWATheam.SwaGray} size={20}/>
                </TouchableOpacity>
            }
            {inputName == "email" && checkMail? 
                <TouchableOpacity style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
                    <Feather name={"check-circle"} size={20} color={SWATheam.SwaBlue}/>
                </TouchableOpacity>:
                null
            }
        </View>
    )
}

export default CustomInput
const styles = StyleSheet.create({})