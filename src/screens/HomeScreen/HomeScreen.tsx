import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, FAB, IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { UpdateProfileComponent } from './components/UpdateProfileComponent';
import firebase from '@firebase/auth';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { NewMenuComponent } from './components/NewMenuComponent';
import { FlatList } from 'react-native-gesture-handler';
import { MenuCardComponent } from './components/MenuCardComponent';
import { onValue, ref } from 'firebase/database';

//interface - FormProduct
export interface Menu {
    id: string;
    code: string;
    nameMenu: string;
    price: number;
    description: string;
}

export const HomeScreen = () => {

    //hook useState: capturar y modificar la data del usuario autenticado
    const [userData, setUserData] = useState<firebase.User | null>(null)

    //hook useState: permitir que el modal de usuario se visualice o no
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false)

    //hook useState: permitir que el modal de usuario se visualice o no
    const [showModalMenu, setShowModalMenu] = useState<boolean>(false)

    //hook useState: gestionar la lista de productos
    const [menus, setMenus] = useState<Menu[]>([])

    //hook useEffect: obtener los datos del usuario autenticado
    useEffect(() => {
        const displayName = (auth.currentUser)
        setUserData(displayName);
        getAllProducts();
    }, []);

    // funcion: obtener los productos para listarlos
    const getAllProducts = () => {
        const dbRef = ref(dbRealTime, 'menus/' + auth.currentUser?.uid);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            const getKeys = Object.keys(data);
            const listMenu: Menu[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key }
                listMenu.push(value);
            });
            setMenus(listMenu);
        })
    }


    return (
        <View style={styles.rootHome}>
            <View style={styles.header}>
                <Avatar.Text size={50} label="CW" style={{ backgroundColor: '#ff913a' }} />
                <View>
                    <Text variant="bodyMedium">Bienvenid@</Text>
                    <Text variant="labelLarge">{userData?.displayName}</Text>
                </View>
                <View style={styles.icon}>
                    <IconButton
                        icon="account-edit"
                        size={30}
                        mode='contained'
                        style={{ backgroundColor: '#ff913a' }}
                        onPress={() => setShowModalProfile(true)}
                    />
                </View>
            </View>
            <UpdateProfileComponent showModalProfile={showModalProfile} setShowModalProfile={setShowModalProfile} />

            <View>
                <FlatList
                    data={menus}
                    renderItem={({ item }) => <MenuCardComponent menu={item} />}
                    keyExtractor={item => item.id}
                />
            </View>

            <FAB
                icon="plus"
                style={{ ...styles.fab, backgroundColor: '#ff913a' }}
                onPress={() => setShowModalMenu(true)}
            />
            <NewMenuComponent showModalMenu={showModalMenu} setShowModalMenu={setShowModalMenu} />
        </View>
    )
}
