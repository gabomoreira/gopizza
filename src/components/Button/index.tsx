import { RectButtonProps } from 'react-native-gesture-handler'
import React from 'react'
import { Container, Load, Title, TypeProps } from './styles'

type Props = RectButtonProps & {
  title: string
  type?: TypeProps
  isLoading?: boolean
}

export const Button = ({
  title, 
  type = 'primary', 
  isLoading = false, 
  ...rest
}: Props) => {
  return (
    <Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
}