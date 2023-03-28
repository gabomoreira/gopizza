import { useContext, useState } from "react"
import { createContext } from "react"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native"

type User = {
    id: string
    name: string
    isAdmin: boolean
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>
    isLoading: boolean
    user: User | null
}
type Props = {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function signIn(email: string, password: string) {
        if(!email || !password) return Alert.alert('Login', 'Informe e-mail e senha')
    
        setIsLoading(true)

        auth().signInWithEmailAndPassword(email, password)
        .then((account) => {
            firestore()
            .collection('users')
            .doc(account.user.uid)
            .get()
            .then(profile => {
                const {name, isAdmin} = profile.data() as User

                if(profile.exists) {
                    const userData = {
                        id: account.user.uid,
                        name,
                        isAdmin
                    }
                    console.log(userData, 'data')
                    setUser(userData)
                }

            }).catch(error => {
                console.log(error)
                Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário.')
            })
        })
        .catch(error => {
            const {code} = error

            if(code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                return Alert.alert('Login', 'Email e/ou senha inválida')
            } else {
                return Alert.alert('Login', 'Não foi possível realizar o login')
            }
        })
        .finally(() => setIsLoading(false))
    }


    return (
        <AuthContext.Provider value={{
            signIn,
            isLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}