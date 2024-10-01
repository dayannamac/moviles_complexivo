import React, { useState } from 'react'
import { styles } from '../theme/styles'
import { ImageBackground, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface FormRegister
interface FormLogin {
    email: string;
    password: string;
}

//interface Message
export interface Message {
    visible: boolean;
    message: string;
    color: string;
}

const imagenFondo = { uri: 'https://img.freepik.com/fotos-premium/fondo-negro-imagen-alitas-pollo-palabras-alitas-pollo_667286-3034.jpg' }

export const LoginScreen = () => {

    //hook useState: para cambiar estado del formulario
    const [formSignIn, setFormSignIn] = useState<FormLogin>({
        email: '',
        password: ''
    })

    //hook useState: para cambiar estado de mensaje
    const [showMessage, setShowMessage] = useState<Message>({
        visible: false,
        message: '',
        color: '#fff'
    })

    //hook useState: para mostrar/ocultar contraseña
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true)

    //hook navigation: permite la navegacion de un screen a otro
    const navigation = useNavigation();

    //funcion para actualizar el estado del formulario
    const handlerSetValues = (key: string, value: string) => {
        setFormSignIn({ ...formSignIn, [key]: value });
    }

    //funcion para registar al nuevo usuario
    const handlerSignIn = async () => {
        if (!formSignIn.email || !formSignIn.password) {
            setShowMessage({
                visible: true,
                message: 'Debe completar todos los campos!',
                color: '#f03a3a'
            });
            return;
        }
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formSignIn.email,
                formSignIn.password
            );
            setShowMessage({
                visible: true,
                message: 'Inicio de sesión exitoso',
                color: '#acf72a'
            });
            navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
        } catch (e) {
            setShowMessage({
                visible: true,
                message: 'No se ha podido iniciar sesión, intenta nuevamente!',
                color: '#f03a3a'
            });
        }
    }

    return (
        <ImageBackground source={imagenFondo} resizeMode='cover' style={styles.rootImagen}>
            <View style={styles.root}>
                <Text variant="titleMedium" style={styles.textTitle}>Inicia Sesión</Text>
                <TextInput
                    label="Correo"
                    mode='outlined'
                    placeholder='Escribe tu correo'
                    onChangeText={(value) => handlerSetValues('email', value)}
                />
                <TextInput
                    label="Contraseña"
                    mode='outlined'
                    placeholder='Escribe tu contraseña'
                    secureTextEntry={hiddenPassword}
                    onChangeText={(value) => handlerSetValues('password', value)}
                    right={<TextInput.Icon icon={hiddenPassword ? "eye-off" : "eye"}
                        onPress={() => (setHiddenPassword(!hiddenPassword))} />}
                />
                <Button mode="contained" 
                style={{backgroundColor:'#ff913a'}}
                onPress={handlerSignIn}>
                    Iniciar
                </Button>
                <Text variant="labelMedium" style={styles.textRedirect}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}
                >No tienes una cuenta? Registrate aquí</Text>
                <Snackbar
                    visible={showMessage.visible}
                    onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                    style={{
                        ...styles.message,
                        backgroundColor: showMessage.color
                    }}>
                    {showMessage.message}
                </Snackbar>
            </View>
        </ImageBackground>
    )
}
