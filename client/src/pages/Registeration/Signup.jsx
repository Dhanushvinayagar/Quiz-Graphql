import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { signupApi } from '../../services/api.services';
import { useNavigate } from "react-router-dom";
import isLoggedIn from '../../utils/loggedin';

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmpassword: ''
    });

    // validation
    const [errorName, setnameError] = useState(false)
    const [errorPassword, seterrPassword] = useState(false)
    const [errorCheck, seterrCheck] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [notification,setNotification] = useState('')

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        const check = (name, value) => {
            if (name === 'username') {
                setnameError(value.length < 8 || value.length > 12);
                setNotification('')
            }
            if (name === 'password') {
                seterrPassword(value.length < 8 || value.length > 12);
            }
            if (name === 'confirmpassword') {
                seterrCheck(value !== formData.password);
            }
            
        };

        check(e.target.name, e.target.value)
    };


    const handleSubmit = async (e) => {
        if (!(errorName || errorPassword || errorCheck)) {
            console.log('Signup submitted', formData);
            try {
                const response = await signupApi({
                    "username": formData.username,
                    "password": formData.password
                })
                console.log(response);
                if(response["quizusertoken"]){
                    navigate('/login')
                }
            } catch (error) {
                console.error("Error occured ",error);
                if(error.message.includes("Duplicate entry")) {
                    setNotification('User already exists')
                }
            }
        }
    };

    useLayoutEffect(()=>{
        const checkAlreadyLogin = async() =>{
            try{
                const response = await isLoggedIn()
                if (response) {
                    navigate('/')
                }
            }catch(error){
                console.error("Error occured ",error);
            }
        }
        checkAlreadyLogin()
    },[])

    useEffect(() => {
        if (!errorName && !errorPassword && !errorCheck) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }, [errorName, errorPassword, errorCheck])

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
                        <Heading size="lg">Signup</Heading>
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
                                {
                                    errorName ?
                                    <>
                                    <Text color="red.900" fontSize="md"> Username must be 8-12 characters</Text> 
                                    </>:
                                        <></>
                                }

                                {
                                    notification && 
                                    <Text color="red.900" fontSize="md"> {notification} </Text>
                                }

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
                                    errorPassword ? <Text color="red.900" fontSize="md"> Password must be 8-12 characters</Text> :
                                        <></>
                                }
                                <FormControl>
                                    <FormLabel>Password(again)</FormLabel>
                                    <Input
                                        type="password"
                                        name="confirmpassword"
                                        value={formData.confirmpassword}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                </FormControl>

                                {
                                    errorCheck ? <Text color="red.900" fontSize="md"> Password not matching </Text> :
                                        <></>
                                }
                                {submit ?
                                    <Button type="button" colorScheme="teal" onClick={handleSubmit}>
                                        Signup
                                    </Button>
                                    :
                                    <Button type="button" colorScheme="gray" >
                                        <Text color="gray.400" fontSize="md">
                                            Signup
                                        </Text>
                                    </Button>
                                }
                            </VStack>
                        </div>

                    </VStack>
                </div>

            </Box>

        </>
    );
};

export default Signup;
