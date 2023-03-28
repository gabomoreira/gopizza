import { useTheme } from 'styled-components/native'
import { Image, Placholder, PlacholderTitle } from './styles'

type Props = {
  uri: string | null
}

export const Photo = ({uri = null}: Props) => {
  
  if(uri) {
    return (
      <Image 
        source={{uri}}
      />
    )
  }

  return  (
    <Placholder>
      <PlacholderTitle>
        Nenhuma foto {'\n'}
        carregada
      </PlacholderTitle>
    </Placholder>
  )
}
