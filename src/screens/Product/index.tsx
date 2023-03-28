import { useState } from "react"
import { Alert, Platform, ScrollView, TouchableOpacity } from "react-native"
import { ButtonBack } from "../../components/ButtonBack"
import { Photo } from "../../components/Photo"
import { Container, DeleteLabel, Form, Header, InputGroup, InputGroupHeader, Label, MaxCharacters, PickImageButton, Title, Upload } from "./styles"
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from "../../components/InputPrice"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


export const Product = () => {
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
        .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
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


  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
                <ButtonBack onPress={() => {}}/>
                <Title>
                    Cadastrar
                </Title>
                <TouchableOpacity>
                    <DeleteLabel>
                        Deletar
                    </DeleteLabel>
                </TouchableOpacity>
            </Header>

        <Upload>
                <Photo 
                    uri={image}
                />
                <PickImageButton 
                    title="Carregar" 
                    type='secondary' 
                    onPress={handlePickerImage}
                />
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
            
                <Button 
                    title='Cadastrar produto'
                    isLoading={isLoading}
                    onPress={handleAdd}
                />
            </Form>
        </ScrollView>
    </Container>
  )
}