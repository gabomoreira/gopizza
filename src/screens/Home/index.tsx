import { Alert, FlatList, TouchableOpacity } from 'react-native'
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemNumber, NewProductButton, Title } from './styles'
import {MaterialIcons } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'

import happyEmoji from '../../assets/happyemoji.png'
import { useTheme } from 'styled-components/native'
import { Search } from '../../components/Search'
import { ProductCard, ProductProps } from '../../components/ProductCard'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export const Home = () => {
  const {COLORS} = useTheme()
  const navigation = useNavigation()

  const [pizzas, setPizzas] = useState<ProductProps[]>([])
  const [search, setSearch] = useState('')

  function handleSearchClear() {
    setSearch('')
    fetchPizzas('')
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
      setPizzas(data)
    })
    .catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'))
  }

  function handleSearch() {
    fetchPizzas(search)
  }

  function handleOpen(id: string) {
    navigation.navigate('product', {id})
  }
  
  function handleAdd() {
    navigation.navigate('product', {})
  }

  useFocusEffect(useCallback(() => {
    fetchPizzas('')
  }, []))

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

      <Search 
        value={search}
        onChangeText={setSearch}
        onClear={handleSearchClear} 
        onSearch={handleSearch} 
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemNumber>{pizzas.length} pizzas</MenuItemNumber>
      </MenuHeader>

      <FlatList 
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductCard 
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
      />

      <NewProductButton 
        title='Cdastrar Pizza'
        type='secondary'
        onPress={handleAdd}
      />
    </Container>
  )
}