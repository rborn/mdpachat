import firebase from 'react-native-firebase';
import _ from 'lodash';

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

const watchUsers = callback => {
    firebase
        .database()
        .ref(`users`)
        .on('value', snapshot => {
            const members = snapshot.val();
            callback(members);
        });
};

const watchMessages = callback => {
    firebase
        .database()
        .ref(`messages`)
        .on('value', snapshot => {
            const res = snapshot.val();
            const messages = _.map(res, value => {
                return value;
            });
            callback(messages);
        });
};

const sendTextMessage = ({ text, userId }) => {
    firebase
        .database()
        .ref(`messages`)
        .push({ type: 'text', text, userId });
};

export { login, register, updateUser, watchUsers, watchMessages, sendTextMessage };
