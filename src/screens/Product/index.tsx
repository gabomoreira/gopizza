import { Platform, TouchableOpacity } from "react-native"
import { ButtonBack } from "../../components/ButtonBack"
import { Photo } from "../../components/Photo"
import { Container, DeleteLabel, Header, Title } from "./styles"


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

        <Photo 
            uri='https://github.com/gabomoreira.png'
        />
    </Container>
  )
}