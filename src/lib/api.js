import firebase from 'react-native-firebase';

const login = async ({ email, password }) => {
    try {
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
        return firebase.auth().currentUser.toJSON();
    } catch (error) {
        return { error };
    }
};

const register = async ({ email, password, name }) => {
    try {
        await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser.toJSON();
        await updateUser({ name, userId: currentUser.uid });
        return currentUser;
    } catch (error) {
        return { error };
    }
};

const updateUser = async ({ name, photo, description, userId }) => {
    try {
        return await firebase
            .database()
            .ref(`users/${userId}`)
            .update({
                name,
                photo,
                description
            });
    } catch (error) {
        return { error };
    }
};

export { login, register, updateUser };
