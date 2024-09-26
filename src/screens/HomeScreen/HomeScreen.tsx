import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { auth } from '../../config/firebaseConfig';
import { styles } from '../../theme/styles';

interface FormUser {
    name: string;
}

export const HomeScreen = () => {

    //hook useState: permite cambiar el estado del formulario
    const [userAuth, setUserAuth] = useState<FormUser>({
        name: ''
    })

    //hook useEffect: validad el estado de autenticacion 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAuth({ name: user.displayName ?? 'Usuario' })
            }
        })
    }, [])


    return (
        <View style={styles.rootHome}>
            <View style={styles.headerHome}>
                <Avatar.Text size={50} label="CW" style={{backgroundColor:'#ff913a'}}/>
                <View>
                    <Text variant="bodyMedium">Bienvenid@</Text>
                    <Text variant="labelLarge">{userAuth.name}</Text>
                </View>
            </View>
        </View>
    )
}
