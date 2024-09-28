import React, { useEffect, useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { updateProfile } from 'firebase/auth';
import firebase from '@firebase/auth';
import { auth } from '../../../config/firebaseConfig';

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
            </Modal>
        </Portal>
    )
}
