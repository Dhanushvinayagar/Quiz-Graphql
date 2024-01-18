import { useLoaderData } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import CheckLogin from './checkLogin';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { Text, Heading, Image } from '@chakra-ui/react'
import quizImage from '../assets/quizhome.jpg';
import '../App.css'
const Application = () => {

  CheckLogin(useLoaderData())
  const navigate = useNavigate()

  const goToDashboard = () => {
    navigate('/dashboard')
  }
  return (
    <div>
      <Card align='center' shadow={'white'}>
        <CardHeader background={'#faf0e6'} width={'100%'} textAlign={'center'}>
          <Heading size='lg' > Quiz App</Heading>
        </CardHeader>
        <CardBody>
          <div className='quiz-img'>
          <Image
            objectFit='cover'
            src={quizImage}
            alt='quizimg'
            height={'300'}
          />
          </div>
          <Text color={'#918151'} fontSize={"xs"}>
            Test your knowledge with our engaging quizzes. Choose from a variety of topics and challenge yourself with fun and educational questions.
          </Text>
          
        </CardBody>
          <Button colorScheme='blue' onClick={goToDashboard}>Go to Dashboard</Button>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Application
