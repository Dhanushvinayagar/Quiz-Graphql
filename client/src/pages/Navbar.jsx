import React from 'react'
import { useNavigate } from "react-router-dom";
import { Flex, Box, Text, Spacer, Link, Button } from '@chakra-ui/react';

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem('quizuser')
    localStorage.removeItem('quizusertoken')
    navigate('/login')
  }

    return (
        <div>
            <Flex p="4" bg="teal.500" color="white">
                <Box>
                    <Text fontSize="2xl" fontWeight="bold">
                        Dashboard
                    </Text>
                </Box>

                <Spacer />

                <Flex gap={'10px'}>
                    <Button color={'#46008b'} backgroundColor={'#bc77ff'} >
                        Profile
                    </Button>
                    <Button color={'green'} backgroundColor={'#C8FFB0'} >
                        Analysis
                    </Button>
                    <Button color={'blue'} backgroundColor={'#add8e6'} >
                        Take test
                    </Button>
                    <Button color={'red'} backgroundColor={'#FF7F7F'} onClick={logout}>
                        Logout
                    </Button>

                </Flex>
            </Flex>
        </div>
    )
}

export default Navbar
