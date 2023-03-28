import { TextInput } from "react-native"
import styled, {css} from "styled-components/native"

export const Container = styled.View`
    width: 100%;
    height: 56px;
    border: 1px solid ${({theme}) => theme.COLORS.SHAPE};
    border-radius: 12px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
`

export const Size = styled.View`
    width: 56px;
    height: 56px;
    align-items: center;
    justify-content: center;
    border-right-width: 1px;
    border-right-color: ${({theme}) => theme.COLORS.SHAPE};
    margin-right: 18px;
`

export const Label = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.FONTS.TEXT};
    color: ${({theme}) => theme.COLORS.SECONDARY_900};
`

export const Input = styled(TextInput)`
    flex: 1;
    margin-left: 7px;
`