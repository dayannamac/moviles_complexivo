import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from '../../theme/styles'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Menu } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { auth, dbRealTime } from '../../config/firebaseConfig'

export const DetailMenuScreen = () => {

    const route = useRoute();
    //@ts-ignore
    const { menu } = route.params;

    //hook useState: cambiar el estado de actualizar y eliminar
    const [formEdit, setFormEdit] = useState<Menu>({
        id: '',
        code: '',
        nameMenu: '',
        price: 0,
        description: ''
    })

    //hook useNavigation: permite navegar de un screen a otro
    const navigation = useNavigation();

    //useEffect: cargar y mostrar la data en el formulario de detalle
    useEffect(() => {
        //actualizar los datos en el formulario
        setFormEdit(menu);
    }, []);

    //funcion: actualizar los datos capturados desde el formulario
    const handleSetValues = (key: string, value: string) => {
        setFormEdit({ ...formEdit, [key]: value })
    }

    //funcion: actualizar la data del menu
    const handleUpdateMenu = async () => {
        const dbRef = ref(dbRealTime, 'menus/' + auth.currentUser?.uid + '/' + formEdit.id)
        try {
            await update(dbRef, {
                code: formEdit.code,
                nameMenu: formEdit.nameMenu,
                price: formEdit.price,
                description: formEdit.description
            })
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    //funcion: eliminar un menu de la data
    const handleDeteleMenu = async () => {
        const dbRef = ref(dbRealTime, 'menus/' + auth.currentUser?.uid + '/' + formEdit.id)
        try {
            await remove(dbRef)
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    } 

    return (
        <View style={styles.rootDetail}>
            <View>
                <Text style={styles.textDetail}>Código: </Text>
                <TextInput
                    value={formEdit.code}
                    onChangeText={(value) => handleSetValues('code', value)} />
                <Divider />
            </View>
            <View>
                <Text style={styles.textDetail}>Nombre: </Text>
                <TextInput
                    value={formEdit.nameMenu}
                    onChangeText={(value) => handleSetValues('nameMenu', value)} />
                <Divider />
            </View>
            <View>
                <Text style={styles.textDetail}>Precio: </Text>
                <TextInput
                    value={formEdit.price.toString()}
                    onChangeText={(value) => handleSetValues('price', value)} />
            </View>
            <View>
                <Text style={styles.textDetail}>Descripción: </Text>
                <TextInput
                    value={formEdit.description}
                    multiline
                    numberOfLines={3}
                    onChangeText={(value) => handleSetValues('description', value)} />
            </View>
            <Button
                icon='update'
                mode='contained'
                style={{ backgroundColor: '#ff913a' }}
                onPress={handleUpdateMenu}>
                Actualizar
            </Button>
            <Button
                icon='delete'
                mode='contained'
                style={{ backgroundColor: '#ff913a' }}
                onPress={handleDeteleMenu}>
                Eliminar
            </Button>
        </View>
    )
}
