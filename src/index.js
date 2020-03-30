import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './App';
import Footer from './components/Footer'
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faUsers, faPlus, faMinus, faCloudUploadAlt, faRedo, faSignOutAlt, faChevronLeft, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faTrophy, faPlus, faMinus, faCloudUploadAlt, faRedo, faSignOutAlt, faChevronLeft, faSpinner,faCheck)
ReactDOM.render([<App />,<Footer/>], document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
