import Actions from '../actions';
import alt from '../alt';


class MessageStore {

    constructor() {
        this.messages = [];
        this.bindListeners({
            dismissAlert: Actions.DISMISS_ALERT
        });
    }

    addMessage(level, msg) {
        this.messages = this.messages.push({ level: level, text: msg });
    }

    dismissAlert(index) {
        this.messages.splice(index, 1);
        //this.setState({ messages: this.messages });
    }

    success(msg){
        this.addMessage("success", msg);
    }

    warning(msg){
        this.addMessage("warning", msg);
    }

}

export default alt.createStore(MessageStore, 'MessageStore');
