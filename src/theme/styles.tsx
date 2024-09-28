import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 15,
    },
    textTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    message: {
        width: 430
    },
    rootActivity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRedirect: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    rootHome: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20
    },
    rootImagen: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    icon: {
        alignItems: 'flex-end',
        flex: 1,
    },
    modal: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        gap: 15
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 0,
        backgroundColor:'#ff913a'
    },
})