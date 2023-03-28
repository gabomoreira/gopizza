import { useState } from "react"
import { Platform, ScrollView, TouchableOpacity } from "react-native"
import { ButtonBack } from "../../components/ButtonBack"
import { Photo } from "../../components/Photo"
import { Container, DeleteLabel, Form, Header, InputGroup, InputGroupHeader, Label, MaxCharacters, PickImageButton, Title, Upload } from "./styles"
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from "../../components/InputPrice"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"


export const Product = () => {
    const [image, setImage] = useState('');

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
                    <Input />
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
                    />
                </InputGroup>

                <InputGroup>
                    <Label>Tamanho e preços</Label>
                    <InputPrice size="P" />
                    <InputPrice size="M" />
                    <InputPrice size="G" />
                </InputGroup>
            
                <Button 
                    title='Cadastrar produto'
                />
            </Form>
        </ScrollView>
    </Container>
  )
}