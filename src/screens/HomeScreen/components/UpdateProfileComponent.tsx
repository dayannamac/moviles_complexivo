import React, { useEffect, useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { updateProfile, signOut } from 'firebase/auth';
import firebase from '@firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface - Prop (Propiedades que se envian de un componente padre a un componente hijo)
interface Props {
    showModalProfile: boolean;
    setShowModalProfile: Function;
}

// interface - FormUser
interface FormUser {
    name: string;
}

export const UpdateProfileComponent = ({ showModalProfile, setShowModalProfile }: Props) => {

    //hook useState: permite cambiar el estado del formulario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    })

    //hook useState: capturar y modificar la data del usuario logueado
    const [userData, setUserData] = useState<firebase.User | null>(null)

    //hook useEffect: validar el estado de autenticacion 
    useEffect(() => {
        setUserData(auth.currentUser)
        setFormUser({ name: auth.currentUser?.displayName ?? '' })
    }, []);

    //hook useNavigation: permitir navegacion de un screen a otro
    const navigation = useNavigation();

    //funcion: actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value });
    }

    //funcion: actualizar la informacion del usuario autenticado
    const handlerUpdateUser = async () => {
        try {
            await updateProfile(userData!,
                { displayName: formUser.name })
        } catch (e) {
            console.log(e);
        }
        //cerrar modal
        setShowModalProfile(false);
    }

    //funcion: cerrar sesión del usuario
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            //resetear las rutas
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            }));
            setShowModalProfile(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Portal>
            <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineSmall'>Mi perfil</Text>
                    <View style={styles.icon}>
                        <IconButton
                            icon="close-circle-outline"
                            size={30}
                            onPress={() => setShowModalProfile(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    mode='outlined'
                    label='Nombre'
                    value={formUser.name}
                    onChangeText={(value) => handleSetValues('name', value)}
                />
                <TextInput
                    mode='outlined'
                    label='Correo'
                    disabled
                    value={userData?.email!}
                />
                <Button mode='contained'
                    onPress={handlerUpdateUser}
                    style={{ backgroundColor: '#ff913a' }}>
                    Actualizar</Button>
                <View style={styles.iconSignOut}>
                    <IconButton
                        icon="logout-variant"
                        size={30}
                        mode='contained'
                        style={{ backgroundColor: '#ff913a' }}
                        onPress={handleSignOut}
                    />
                </View>
            </Modal>
        </Portal>
    )
}
