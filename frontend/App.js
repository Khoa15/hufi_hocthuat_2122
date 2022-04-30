import React, { useEffect, useState } from "react";
import {NativeBaseProvider, Flex, Spacer, Center, HStack} from "native-base";
import Chat from "./components/pages/Chat"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login";
import jwt from 'jsonwebtoken'
import {io} from 'socket.io-client'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator()
const socket = io(`http://localhost:3000`, {transports: ['websocket']})


export default function App(){
  const [token, setToken] = useState("")
  useEffect(()=>{
    socket.on('getToken', token=>{
      setToken(token)
    })
    return ()=>{
      socket.disconnect()
    }
}, [])
  const [isSignedId, setIsSignedId] = useState(false)
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Chat">
            <Stack.Screen name="Home" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}