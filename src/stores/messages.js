import { observable } from 'mobx';

import { watchMessages, watchUsers, sendTextMessage, getLastCameraRollPhoto, sendPhotoMessage } from '@lib/api';

class MessagesStore {
    @observable data = {};

    constructor() {
        watchMessages(messages => {
            this.data = messages;
        });
    }
}

const store = new MessagesStore();

export default store;
