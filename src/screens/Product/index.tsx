import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { useNavigation, useRoute } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from "react"
import { Alert, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import { ProductNavigationProps } from "../../@types/navigation"
import { Button } from "../../components/Button"
import { ButtonBack } from "../../components/ButtonBack"
import { Input } from "../../components/Input"
import { InputPrice } from "../../components/InputPrice"
import { Photo } from "../../components/Photo"
import { ProductProps } from "../../components/ProductCard"
import { Container, DeleteLabel, Form, Header, InputGroup, InputGroupHeader, Label, MaxCharacters, PickImageButton, Title, Upload } from "./styles"

type PizzaResponse = ProductProps & {
    photo_path: string
    prices_sizes: {
        p: string
        m: string
        g: string
    }
}

export const Product = () => {
    const navigation = useNavigation()
    const route = useRoute() 
    const {id} = route.params as ProductNavigationProps

    const [photoPath, setPhotoPath] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const handlePickerImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 4]
          });
  
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
  };

  async function handleAdd() {
    if (veirifyIsValidPizza()) {
        setIsLoading(true)

        const fileName = new Date().getTime()
        const reference = storage().ref(`/pizzas/${fileName}.png`)

        await reference.putFile(image)
        const photo_url = await reference.getDownloadURL()

        firestore()
        .collection('pizzas')
        .add({
            name,
            name_insensitive: name.toLowerCase().trim(),
            description,
            prices_sizes: {
                p: priceSizeP,
                m: priceSizeM,
                g: priceSizeG,
            },
            photo_url,
            photo_path: reference.fullPath
        })
        .then(() => {
            Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.')
            navigation.navigate('home')
        })
        .catch(() => Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.'))
        .finally(() => {
            setIsLoading(false)
        })
        
    }
   
 }

 function veirifyIsValidPizza() {
    const data = [
        {'a imagem': image},
        {'o nome': name},
        {'a descrição': description},
        {'o preço do tamanho P': priceSizeP},
        {'o preço do tamanho M': priceSizeM},
        { 'o preço do tamanho G': priceSizeG},
    ]

    for (let i = 0; i < data.length; i++) {
        if(!Object.values(data[i])[0].trim()) {
            return Alert.alert('Cadastro', `Informe ${Object.keys(data[i])[0]} da pizza.`)
        }
    }

    return true
 }

 function handleGoBack() {
    navigation.navigate('home')
 }

 function handleDelete() {
    firestore()
    .collection('pizzas')
    .doc(id)
    .delete()
    .then(() => {
        storage()
        .ref(photoPath)
        .delete()
        .then(() => navigation.navigate('home'))
    })
 }

 useEffect(() => {
    if(id) {
        firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => {
            const product = response.data() as PizzaResponse
            console.log(response, 'response')

            setPhotoPath(product.photo_path)
            setImage(product.photo_url)
            setName(product.name)
            setDescription(product.description)
            setPriceSizeP(product.prices_sizes.p)
            setPriceSizeM(product.prices_sizes.m)
            setPriceSizeG(product.prices_sizes.g)
        })
    }
 }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <ButtonBack onPress={handleGoBack}/>
                <Title>
                    Cadastrar
                </Title>
               {id ? (
                    <TouchableOpacity onPress={handleDelete}>
                        <DeleteLabel>
                            Deletar
                        </DeleteLabel>
                    </TouchableOpacity>
               ) : (
                <View style={{width: 20}} />
               )
            }
            </Header>

        <Upload>
                <Photo 
                    uri={image}
                />
                {
                    !id && (
                        <PickImageButton 
                            title="Carregar" 
                            type='secondary' 
                            onPress={handlePickerImage}
                        />
                    )
                }
        </Upload>

            <Form>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input onChangeText={setName} value={name} />
                </InputGroup>

                <InputGroup>
                    <InputGroupHeader>
                        <Label>Descrição</Label>
                        <MaxCharacters>0 de 60 caracters</MaxCharacters>
                    </InputGroupHeader>

                    <Input
                        multiline
                        maxLength={60}
                        style={{height: 80}}
                        onChangeText={setDescription} value={description}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Tamanho e preços</Label>
                    <InputPrice size="P" onChangeText={setPriceSizeP} value={priceSizeP} />
                    <InputPrice size="M" onChangeText={setPriceSizeM} value={priceSizeM}/>
                    <InputPrice size="G" onChangeText={setPriceSizeG} value={priceSizeG}/>
                </InputGroup>
            
               {
                !id && (
                    <Button 
                        title='Cadastrar produto'
                        isLoading={isLoading}
                        onPress={handleAdd}
                    />
                )
               }
            </Form>
        </ScrollView>
    </Container>
  )
}