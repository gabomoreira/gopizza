import { Platform, TouchableOpacity } from "react-native"
import { ButtonBack } from "../../components/ButtonBack"
import { Photo } from "../../components/Photo"
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload } from "./styles"


export const Product = () => {
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
            uri='https://github.com/gabomoreira.png'
        />
        <PickImageButton title="Carregar" type='secondary' />
       </Upload>

    </Container>
  )
}