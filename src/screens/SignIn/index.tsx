import { Input } from "../../components/Input"
import { Container } from "./styles"

export const SignIn = () => {
  return (
    <Container>
        <Input 
          placeholder="E-mail"
          type='secondary'
          autoCorrect={false}
          autoCapitalize='none'
        />

        <Input 
          placeholder="Senha"
          type='secondary'
          secureTextEntry
        />
    </Container>
  )
}