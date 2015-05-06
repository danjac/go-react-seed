import * as api from './api';
import alt from './alt';


class Actions {
    dismissAlert(index) {
        this.dispatch(index);
    }
}

export default alt.createActions(Actions);
