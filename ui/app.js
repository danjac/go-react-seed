import React from 'react';
import Router from 'react-router';
import Routes from './Routes';

import alt from './alt';

const initData = window.initData;

if (initData) {
    alt.bootstrap(initData);
}

Router.run(Routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler />, document.body);
});
