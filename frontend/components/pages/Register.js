import {useState, useEffect} from 'react'
import { NativeBaseProvider, Box, Button, Text, Heading, FormControl, Stack, Center, Input, Divider, Link  } from "native-base"
import {io} from 'socket.io-client'
import axios from 'axios'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
const socket = io(`http://localhost:3000`, {transports: ['websocket']})
const ErrorMessage = (props) => {
    let msg = "Vui lòng điền trường này";
    return (
        <FormControl.ErrorMessage>
            {msg}
        </FormControl.ErrorMessage>
    )
}
const Register = ({navigation}) =>{
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [psw, setPsw] = useState("")
    const [repsw, setRepsw] = useState("")
    const [isIt, setIsit] = useState([false, false, false, false, false, false, false])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleName = name => setName(name)
    const handlePhone = phone => setPhone(phone)
    const handleEmail = email => setEmail(email)
    const handlePassword = password => setPsw(password)

    const handleRepsw = (e)=>{
        console.log(e, psw, isIt)
        if(e !== psw){
            setIsit([{...isIt, 2: true}][0])
        }else{
            setIsit([{...isIt, 2: false}][0])
        }
        setRepsw(e)

    }

    const handleChange = (e) =>{
        const nameId = e.target.id,
            id = Number(nameId.charAt(nameId.length - 1)) - 1
        if(e.target.value !== "") setIsit([{...isIt, [id]: false}][0])
        else setIsit([{...isIt, [id]: true}][0])
    }
    const multiplyValues = obj => Object.values(obj).reduce((a, b) => a || b ? false : true)
    const sendForm = async()=>{
        try {
            const checkForm = (token && name) && (phone && email) && (psw && 1)
            console.log(checkForm)
            if(checkForm){
                const res = await axios({
                    method: 'post',
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    url: `http://localhost:3000/api/v1/user/auth`,
                    data:{
                        name: name,
                        email: email,
                        main_number_phone: phone,
                        password: psw,
                    }
                })
            }
        } catch (error) {
            const {success, message} = error.response.data
        }
    }
    const handleBtnRegister = async() => {
        setIsSubmitting(true)
        sendForm()
        setIsSubmitting(false)
    }

    
    return (
        <NativeBaseProvider>
            <Center>
                <Stack alignSelf={'center'} px={4} mt={4} w={{base: "100%", md: "25%"}} safeArea space={2.5}>
                    <Box>
                        <Box mb={4}>
                            <Text fontSize="xs">CHÀO MỪNG</Text>
                            <Heading fontSize="4xl">Đăng Ký</Heading>
                        </Box>
                        <FormControl mb={3} isRequired isInvalid={isIt[0]}>
                            <FormControl.Label>Họ và tên:</FormControl.Label>
                            <Input onChangeText={handleName} onFocus={handleChange} onChange={handleChange}  />
                            { isIt[0] && <ErrorMessage /> }
                        </FormControl>
                        <FormControl mb={3} isRequired isInvalid={isIt[1]}>
                            <FormControl.Label>Số điện thoại:</FormControl.Label>
                            <Input type="number" onChangeText={handlePhone} onChange={handleChange} onFocus={handleChange} />
                            { isIt[1] && <ErrorMessage /> }
                        </FormControl>
                        <Divider mb={4} />
                        <FormControl mb={3}>
                            <FormControl.Label>Địa chỉ:</FormControl.Label>
                            <Input />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormControl.Label>CCCD/CMND:</FormControl.Label>
                            <Input type="number" />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormControl.Label>Chụp Ảnh CCCD/CMND:</FormControl.Label>
                            <Input />
                        </FormControl>
                        <Divider mb={4} />
                        <FormControl mb={3}isInvalid={isIt[5]}>
                            <FormControl.Label isRequired >Email:</FormControl.Label>
                            <Input type='email' onChangeText={handleEmail} onChange={handleChange} onFocus={handleChange} />
                            { isIt[5] && <ErrorMessage /> }
                        </FormControl>
                        <FormControl mb={3} isInvalid={isIt[6]}>
                            <FormControl.Label isRequired>Mật khẩu:</FormControl.Label>
                            <Input onChangeText={handlePassword} onChange={handleChange} onFocus={handleChange}/>
                            {
                                isIt[6] && <ErrorMessage />
                            }
                        </FormControl>
                        <FormControl mb={3} isInvalid={isIt[2]}>
                            <FormControl.Label isRequired>Nhập lại mật khẩu:</FormControl.Label>
                            <Input onChangeText={handleRepsw} />
                        </FormControl>
                        {
                            !isSubmitting && <Button bg={'info.500'} mb={2} onPress={handleBtnRegister}>Đăng ký</Button>
                        }
                        {
                            isSubmitting && <Button bg={'info.500'} mb={2} onPress={handleBtnRegister} isLoading spinnerPlacement='right' isLoadingText='Đang gởi...'>Đăng ký</Button>
                        }
                        <Center>
                            <Link onPress={()=>navigation.navigate("Login")}>Bạn đã có tài khoản? Đăng nhập</Link>
                        </Center>
                    </Box>
                </Stack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Register