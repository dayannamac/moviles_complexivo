import React from 'react'
import { Menu } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';


// interface - Props
interface Props {
    menu: Menu;
}

export const MenuCardComponent = ({ menu }: Props) => {

    //hook useNavigation: permite navegar de un screen a otro
    const navigation = useNavigation();

    return (
        <View style={styles.rootListMenu}>
            <View>
                <Text variant="titleMedium">Nombre: {menu.nameMenu}</Text>
                <Text variant="labelLarge">Precio: {menu.price}</Text>
            </View>
            <View style={styles.icon}>
                <IconButton
                    icon="ballot"
                    size={30}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: {menu} }))}
                />
            </View>
        </View>
    )
}
