import { useContext } from "react"
import { createContext } from "react"


type AuthContextData = {

}
type Props = {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({children}: Props) => {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}