import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, FAB, IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { UpdateProfileComponent } from './components/UpdateProfileComponent';
import firebase from '@firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { NewMenuComponent } from './components/NewMenuComponent';

export const HomeScreen = () => {

    //hook useState: capturar y modificar la data del usuario autenticado
    const [userData, setUserData] = useState<firebase.User | null>(null)

    //hook useState: permitir que el modal de usuario se visualice o no
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false)

    //hook useState: permitir que el modal de usuario se visualice o no
    const [showModalMenu, setShowModalMenu] = useState<boolean>(false)

    //hook useEffect: obtener los datos del usuario autenticado
    useEffect(() => {
        const displayName = (auth.currentUser)
        setUserData(displayName);
    }, []);


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
                        style={{backgroundColor:'#ff913a'}}
                        onPress={() => setShowModalProfile(true)}
                    />
                </View>
            </View>
            <UpdateProfileComponent showModalProfile={showModalProfile} setShowModalProfile={setShowModalProfile} />

            <FAB
                icon="plus"
                style={{...styles.fab, backgroundColor: '#ff913a'}}
                onPress={() => setShowModalMenu(true)}
            />
            <NewMenuComponent showModalMenu={showModalMenu} setShowModalMenu={setShowModalMenu}/>
        </View>
    )
}
