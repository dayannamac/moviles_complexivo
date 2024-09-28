import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { Message } from '../../LoginScreen';
import { push, ref, set } from 'firebase/database';
import { dbRealTime } from '../../../config/firebaseConfig';

//interface - Props
interface Props {
    showModalMenu: boolean;
    setShowModalMenu: Function;
}

//interface - FormMenu
interface FormMenu {
    code: string;
    nameMenu: string;
    description: string;
    price: number;
}

export const NewMenuComponent = ({ showModalMenu, setShowModalMenu }: Props) => {

    //hook useState: cambia el estado del formulario
    const [formMenu, setFormMenu] = useState<FormMenu>({
        code: '',
        nameMenu: '',
        description: '',
        price: 0
    })

    //hook useState: cambiar el estado del mensaje
    const [showMessage, setShowMessage] = useState<Message>({
        visible: false,
        message: " ",
        color: "#fff"
    });

    //funcion: actualiza el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormMenu({ ...formMenu, [key]: value })
    }

    //funcion: guardar menú en la BDD
    const handleSaveMenu = async () => {
        if (!formMenu.code || !formMenu.nameMenu ||
            !formMenu.description || !formMenu.price) {
            setShowMessage({
                visible: true,
                message: 'Debe completar todos los campos!',
                color: '#f03a3a'
            });
            return;
        }
        const dbRef = ref(dbRealTime, 'menus');
        const saveMenu = push(dbRef);
        try {
            await set(saveMenu, formMenu);
            setShowMessage({
                visible: true,
                message: 'Registro de menú exitoso',
                color: '#acf72a'
            });
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'Algo ha salido mal, intente de nuevo!',
                color: '#f03a3a'
            });
        }
    }

    return (
        <Portal>
            <Modal visible={showModalMenu} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineSmall'>Nuevo Menú</Text>
                    <View style={styles.icon}>
                        <IconButton
                            icon="close-circle-outline"
                            size={30}
                            onPress={() => setShowModalMenu(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    mode='outlined'
                    label='Código'
                    onChangeText={(value) => handleSetValues('code', value)}
                />
                <TextInput
                    mode='outlined'
                    label='Nombre'
                    onChangeText={(value) => handleSetValues('nameMenu', value)}
                />
                <TextInput
                    mode='outlined'
                    label='Descripción'
                    multiline
                    numberOfLines={3}
                    onChangeText={(value) => handleSetValues('description', value)}
                />
                <TextInput
                    mode='outlined'
                    label='Precio'
                    keyboardType='numeric'
                    onChangeText={(value) => handleSetValues('price', value)}
                />
                <Button mode='contained'
                    onPress={handleSaveMenu}
                    style={{ backgroundColor: '#ff913a' }}>
                    Agregar</Button>
            </Modal>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{
                    ...styles.message,
                    backgroundColor: showMessage.color
                }}>
                {showMessage.message}
            </Snackbar>
        </Portal>
    )
}
