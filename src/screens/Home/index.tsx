import { TouchableOpacity } from 'react-native'
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemNumber, Title } from './styles'
import {MaterialIcons } from '@expo/vector-icons'

import happyEmoji from '../../assets/happyemoji.png'
import { useTheme } from 'styled-components/native'
import { Search } from '../../components/Search'
import { ProductCard } from '../../components/ProductCard'

export const Home = () => {
  const {COLORS} = useTheme()

  function handleOnSearch() {
    
  }

  function handleOnClear() {

  }

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

      <Search onClear={handleOnClear} onSearch={handleOnSearch} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemNumber>10 pizzas</MenuItemNumber>
      </MenuHeader>

      <ProductCard 
        data={{
          id: '1', 
          name: 'Pizza', 
          description: 'lorem asdasd', 
          photo_url: 'https://github.com/gabomoreira.png'}}
      />
    </Container>
  )
}