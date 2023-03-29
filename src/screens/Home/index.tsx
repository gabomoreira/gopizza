import { Alert, TouchableOpacity } from 'react-native'
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemNumber, Title } from './styles'
import {MaterialIcons } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'

import happyEmoji from '../../assets/happyemoji.png'
import { useTheme } from 'styled-components/native'
import { Search } from '../../components/Search'
import { ProductCard, ProductProps } from '../../components/ProductCard'
import { useEffect } from 'react'

export const Home = () => {
  const {COLORS} = useTheme()

  function handleOnSearch() {
    
  }

  function handleOnClear() {

  }

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim()

    firestore()
    .collection('pizzas')
    .orderBy('name_insensitive')
    .startAt(formattedValue)
    .endAt(`${formattedValue}\uf8ff`) //uf8ff limit 
    .get()
    .then(response => {
      const data = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProductProps[]
      console.log(data, 'data')
    })
    .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'))
  }

  useEffect(() => {
    fetchPizzas('')
  }, [])

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