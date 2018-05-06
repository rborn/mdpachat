import { CameraRoll } from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash';

const getLastCameraRollPhoto = async () => {
    const photos = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos'
    });

    return photos.edges[0].node.image;
};

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

            const messages = _.chain(res)
                .map(item => {
                    return item;
                })
                .sortBy(['timestamp'])
                .reverse()
                .value();

            callback(messages);
        });
};

const sendTextMessage = ({ text, userId }) => {
    const timestamp = firebase.database().getServerTime();
    firebase
        .database()
        .ref(`messages`)
        .push({ type: 'text', text, userId, timestamp });
};

const uploadMessagePhoto = async ({ image, userId, timestamp }) => {
    const ref = firebase.storage().ref(`messages/${userId}/${timestamp}_${image.filename}`);

    const uploadResult = await ref.putFile(image.uri);
    image.contentType && ref.updateMetadata({ contentType: image.contentType });

    return uploadResult.downloadURL;
};

const sendPhotoMessage = async ({ image, userId }) => {
    const timestamp = firebase.database().getServerTime();
    const photoUrl = await uploadMessagePhoto({ image, userId, timestamp });

    firebase
        .database()
        .ref(`messages`)
        .push({ type: 'photo', photoUrl, userId, timestamp });
};

export {
    login,
    register,
    updateUser,
    watchUsers,
    watchMessages,
    sendTextMessage,
    sendPhotoMessage,
    getLastCameraRollPhoto
};
