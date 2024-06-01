import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './components/Login';
import { initializeApp } from "firebase/app";
import './firebase/firebase'

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App/>);