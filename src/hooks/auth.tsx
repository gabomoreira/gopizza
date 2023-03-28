import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string
    name: string
    isAdmin: boolean
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    signOut: () => Promise<void>
    isLoading: boolean
    user: User | null
}
type Props = {
    children: React.ReactNode
}

const USER_COLLECTION = '@gopizza:users'

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
            .then(async (profile) => {
                const {name, isAdmin} = profile.data() as User

                if(profile.exists) {
                    const userData = {
                        id: account.user.uid,
                        name,
                        isAdmin
                    }
                    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
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

    async function loadUserStorageData() {
        setIsLoading(true)

        const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

        if(storedUser) {
            const userData = JSON.parse(storedUser) as User
            console.log(userData, 'userDAta')
            setUser(userData)
        }


        setIsLoading(false)
    }

    async function signOut() {
        await auth().signOut()
        await AsyncStorage.removeItem(USER_COLLECTION)
        setUser(null)
    }

    async function forgotPassword(email: string) {
        if(!email) return Alert.alert('Redefinir senha', 'Informe o e-mail.')

        auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para redefinir sua senha.'))
        .catch(error => Alert.alert('Não foi possível enviar o e-mail para redefinir a senha.'))
    }

    useEffect(() => {
        loadUserStorageData()
    }, [])


    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            forgotPassword,
            isLoading,
            user,
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