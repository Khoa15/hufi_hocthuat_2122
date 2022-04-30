import React, {useEffect, useState} from 'react'
import {Box, Input, Button, Text, Flex, HStack, Spacer} from 'native-base'
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000/', {transports: ['websocket']})


export default function Chat(){
    const [message, setMessage] = useState('')
    const [mess, setMess] = useState([])
    const [id, setId] = useState()
    const handleChange = (e)=>{
        setMessage(e.target.value)
    }
    const sendMessage = ()=>{
        if(message !== null){
            const msg = {
                content: message,
                id: id
            }
            socket.emit('sendDataClient', msg)
            setMessage('')
        }
    }

    const renderMess = mess.map((m, index)=>
        <Text alignSelf={`${m.id === id ? 'flex-end' : 'flex-start'}`} key={index}>{m.content}</Text>
    )

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false){
            sendMessage()
        }
    }
    useEffect(()=>{
        socket.on('getId', data=>{
            setId(data)
        })

        socket.on('sendDataServer', data=>{
            setMess(oldMsgs => [...oldMsgs, data.data])
        })

        return () => {
            socket.disconnect()
        }
    }, [])
    return(
        <>
        <Box alignSelf={'center'} w="75%" p="2" rounded={2} bg="primary.300" _text={{color: "white"}}>
            {renderMess}
        </Box>
        <Box alignItems={'center'}>
            <Input mx="3" placeholder='Aa' w="75%" onChange={handleChange} onKeyPress={onEnterPress} value={message}
            InputRightElement={<Button onPress={sendMessage}>Send</Button>} />
        </Box>
        </>
    )
}