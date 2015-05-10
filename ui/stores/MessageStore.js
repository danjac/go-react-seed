import Actions from '../actions';
import alt from '../alt';


class MessageStore {

    constructor() {
        this.messages = [];
        this.bindActions(alt.getActions('Actions'));
    }

    addMessage(level, msg) {
        this.messages.push({ level: level, text: msg });
    }

    dismissAlert(index) {
        this.messages.splice(index, 1);
    }

    success(msg){
        this.addMessage("success", msg);
    }

    warning(msg){
        this.addMessage("warning", msg);
    }

}

export default alt.createStore(MessageStore, 'MessageStore');
