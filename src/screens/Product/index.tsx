import { useState } from "react"
import { Platform, TouchableOpacity } from "react-native"
import { ButtonBack } from "../../components/ButtonBack"
import { Photo } from "../../components/Photo"
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload } from "./styles"
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from "../../components/InputPrice"


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

       <InputPrice size="P" />
       <InputPrice size="M" />
       <InputPrice size="G" />

         

    </Container>
  )
}