import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import {AuthProvider} from "../Contexts/AuthContext";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(<AuthProvider><BrowserRouter><App/></BrowserRouter></AuthProvider>, document.getElementById('root'));