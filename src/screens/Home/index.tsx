import { TouchableOpacity } from 'react-native'
import { Container, Greeting, GreetingEmoji, GreetingText, Header } from './styles'
import {MaterialIcons } from '@expo/vector-icons'

import happyEmoji from '../../assets/happyemoji.png'
import { useTheme } from 'styled-components/native'

export const Home = () => {
  const {COLORS} = useTheme()

  return (
    <Container>
      <Header> 
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
    </Container>
  )
}