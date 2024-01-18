import React, {useLayoutEffect, useState } from 'react';
import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import './login.css'
import { Link } from 'react-router-dom';
import { loginApi } from '../../services/api.services';
import isLoggedIn from '../../utils/loggedin';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMsg , seterrMsg] = useState('')

    
    useLayoutEffect(()=>{
        const checkAlreadyLogin = async() =>{
            try{
                const response = await isLoggedIn()
                if (response) {
                    navigate('/')
                }
            }catch(error){
                console.error("Error occured ",error);
                seterrMsg(error.message)
            }
        }
        checkAlreadyLogin()
    },[])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        const loginFunc = async() =>{
            try {
                // console.log('Login submitted:', formData);
                const response = await loginApi({
                    params :{
                        "username" : formData.username,
                        "password" : formData.password
                    }
                })
                console.log(response , response.quizusertoken);
                if(response.quizusertoken){
                    localStorage.setItem('quizuser',formData.username)
                    localStorage.setItem('quizusertoken',response.quizusertoken)
                    navigate('/')
                }
            } catch (error) {
                seterrMsg(error.message)
            }
        }
        loginFunc()

    };

    return (
        <>
        <Box
                minH="100vh"
                d="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.100"
            >
            <div className='container'>
                <VStack spacing={8} w="400px" p={8} bg="white" borderRadius="lg" boxShadow="lg">
                    <Heading size="lg">Login</Heading>
                    <div style={{ width: '100%' }}>
                        <VStack spacing={4} align="stretch">
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                            </FormControl>

                                {
                                    errorMsg ? <Text color="red.900" fontSize="md"> Invalid username or password </Text> :
                                        <></>
                                }

                            <Button type="button" colorScheme="teal" onClick={handleSubmit}>
                                Login
                            </Button>
                        </VStack>
                    </div>

                    

                    <Text color="gray.900" fontSize="sm">
                        Don't have an account ?  
                        <Link to="/signup" style={{color: "blue" }}> Sign up  
                        </Link>
                        
                    </Text>
                </VStack>
            </div>

        </Box>
        
        </>
    );
};

export default Login;
