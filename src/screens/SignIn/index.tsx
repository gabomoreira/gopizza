import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { KeyboardAvoidingView, Platform  } from "react-native"
import { Brand, Container, Content, Title, FotgotPasswordButton, FotgotPasswordLabel } from "./styles"

import brandImg from '../../assets/brand.png'
import { useAuth } from "../../hooks/auth"
import { useState } from "react"

export const SignIn = () => {
  const {signIn, isLoading, forgotPassword} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn() {
    signIn(email, password)
  }

  function handleForgotPassword() {
    forgotPassword(email)
  }

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
              value={email}
              onChangeText={setEmail}
            />

            <Input 
              placeholder="Senha"
              type='secondary'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              />

            <FotgotPasswordButton onPress={handleForgotPassword}>
              <FotgotPasswordLabel>
                Esqueci minha senha
              </FotgotPasswordLabel>
            </FotgotPasswordButton>

            <Button 
              title="Entrar"
              type='secondary'
              onPress={handleSignIn}
              isLoading={isLoading}
            />
          </Content>
       </KeyboardAvoidingView>
    </Container>
  )
}