import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { KeyboardAvoidingView, Platform  } from "react-native"
import { Brand, Container, Content, Title, FotgotPasswordButton, FotgotPasswordLabel } from "./styles"

import brandImg from '../../assets/brand.png'

export const SignIn = () => {
  return (
    <Container>
       <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
       >
        <Content>

          <Brand source={brandImg} />

          <Title>Login</Title>

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

            <FotgotPasswordButton>
              <FotgotPasswordLabel>
                Esqueci minha senha
              </FotgotPasswordLabel>
            </FotgotPasswordButton>

            <Button 
              title="Entrar"
              type='secondary'
            />
          </Content>
       </KeyboardAvoidingView>
    </Container>
  )
}