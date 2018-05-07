import { CameraRoll } from 'react-native';
// https://facebook.github.io/react-native/docs/cameraroll.html
// keep in mind that the CameraRoll needs to be linked in the native progect first.
// This is a good read article: https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0

import firebase from 'react-native-firebase';
import _ from 'lodash';

import currentUserStore from '@stores/user';

const getLastCameraRollPhoto = async () => {
    // get only the last image, CameraRoll doesn't give us an UI but just a list of photos
    const photos = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos'
    });

    return photos.edges[0].node.image; // TODO handle error cases (like permission denied or no image in gallery)
};

const login = async ({ email, password }) => {
    try {
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password); // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#signInAndRetrieveDataWithEmailAndPassword
        currentUserStore.data = firebase.auth().currentUser.toJSON();
        currentUserStore.data.userId = currentUserStore.data.uid;
        return currentUserStore.data;
    } catch (error) {
        return { error };
    }
};

const register = async ({ email, password, name }) => {
    try {
        await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
        // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#createUserWithEmailAndPassword

        currentUserStore.data = firebase.auth().currentUser.toJSON(); // this is the current user we logged in with

        // https://rnfirebase.io/docs/v4.0.x/auth/reference/auth#currentUser
        // after we register we update the user database with the user Id returned by firebase
        currentUserStore.data.userId = currentUserStore.data.uid;
        await updateUser({ name, userId: currentUserStore.data.userId });
        return currentUserStore.data;
    } catch (error) {
        return { error };
    }
};

const updateUser = async ({ name, photo, description, userId }) => {
    // Keep in mind we decided to keep the users in a separate database from the auth to be able to add more attributes to them (description, etc)
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
            //https://rnfirebase.io/docs/v4.0.x/database/reference/Reference#on
            // the value event triggers everytime we change the database (add/delete/update a message in it)
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
            // the messages are stored as an object in firebase, so we need to map them to an array to populate the FlatList:
            // https://facebook.github.io/react-native/docs/flatlist.html#data
            const messages = _.chain(res)
                .map(item => {
                    return item;
                })
                .sortBy(['timestamp'])
                // We add a timestamp on the message creation, which is the Firebase timestamp so we know the order of the messages
                // https://rnfirebase.io/docs/v4.0.x/database/reference/database#getServerTime

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
    // push message to database https://rnfirebase.io/docs/v4.0.x/database/reference/Reference#push
};

const uploadMessagePhoto = async ({ image, userId, timestamp }) => {
    const ref = firebase.storage().ref(`messages/${userId}/${timestamp}_${image.filename}`);
    // we use the timestamp in the filename or firebase will replace the images with the same filename and  we won't be able to upload multiple times the same image

    const uploadResult = await ref.putFile(image.uri);
    // upload image to firebase storage https://rnfirebase.io/docs/v4.0.x/storage/reference/Reference#putFile
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
