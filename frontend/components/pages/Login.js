import React,{ useEffect, useState } from 'react'
import { NativeBaseProvider, Link, Center, Box, Stack, Heading, Text, FormControl, Input, Button } from 'native-base'
import axios from 'axios'
import {io} from 'socket.io-client'
const socket = io(`http://localhost:3000`, {transports: ['websocket']})
const Login = ({navigation}) => {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSignIn = async() => {
        try{
            const res = await axios({
                method: 'put',
                url: `http://localhost:3000/api/v1/auth`,
                headers:{
                    Authorization: `Bearer ${token}`
                },
                data:{
                    email: email,
                    password: password
                }
            })
            navigation.navigate('Chat')
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        socket.on('getToken', token=>{
          setToken(token)
        })
        return ()=>{
          socket.disconnect()
        }
    }, [])
    return(
        <NativeBaseProvider>
            <Center>
                <Stack alignSelf={'center'} px={4} mt={4} w={{base: "100%", md: "25%"}} safeArea space={2.5}>
                    <Box>
                        <Box mb={4}>
                            <Text fontSize="xs">CHÀO MỪNG</Text>
                            <Heading fontSize="4xl">Đăng Nhập</Heading>
                        </Box>
                        <FormControl mb={3} isRequired isInvalid={0}>
                            <FormControl.Label>Email:</FormControl.Label>
                            <Input type="email" />
                        </FormControl>
                        
                        <FormControl mb={3} isRequired isInvalid={0}>
                            <FormControl.Label>Mật khẩu:</FormControl.Label>
                            <Input type="password" />
                        </FormControl>

                        <Button bg={'info.500'} mb={2} onPress={handleSignIn}>Đăng nhập</Button>
                        <Center>
                            <Link onPress={()=>navigation.goBack()}>Bạn chưa có tài khoản? Đăng ký</Link>
                        </Center>
                    </Box>
                </Stack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Login