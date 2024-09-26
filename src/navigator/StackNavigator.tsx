import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';

const Stack = createStackNavigator();

//interface - Routes
interface Routes {
    name: string;
    screen: () => JSX.Element;
}

//arreglo de usuario no logueado
const routesNoAuth: Routes[] = [
    { name: 'Login', screen: LoginScreen },
    { name: 'Register', screen: RegisterScreen },
]

//arreglo para usuario logueado
const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen }
]

export const StackNavigator = () => {

    //hook useState: verificar si esta logueado o no
    const [isAuth, setIsAuth] = useState<boolean>(false)

    //hook useEffect: validar estado de autenticacion
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            }
            setIsLoading(false);
        });
    }, [])

    //hook useState: controlar la carga inicial
    const [isLoading, setIsLoading] = useState<boolean>(false)


    return (
        <>
            {
                isLoading ? (
                    <View style={styles.rootActivity}>
                        <ActivityIndicator animating={true} size={40} />
                    </View >
                ) : (
                    <Stack.Navigator>
                        {
                            !isAuth ?
                                routesNoAuth.map((item, index) => (
                                    <Stack.Screen key={index}
                                        name={item.name}
                                        options={{ headerShown: false }}
                                        component={item.screen} />
                                ))
                                :
                                routesAuth.map((item, index) => (
                                    <Stack.Screen key={index}
                                        name={item.name}
                                        options={{ headerShown: false }}
                                        component={item.screen} />
                                ))
                        }
                    </Stack.Navigator>
                )
            }
        </>
    );
}