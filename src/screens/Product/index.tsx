import { Platform, TouchableOpacity } from "react-native"
import { Container, DeleteLabel, Header, Title } from "./styles"


export const Product = () => {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header>
            <Title>
                Cadastrar
            </Title>
            <TouchableOpacity>
                <DeleteLabel>
                    Deletar
                </DeleteLabel>
            </TouchableOpacity>
        </Header>
    </Container>
  )
}