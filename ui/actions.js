import * as api from './api';
import alt from './alt';

export default alt.createActions(class Actions {
    constructor() {
        this.generateActions(
            'dismissAlert',
            'success',
            'warning'
        );
    }
});
