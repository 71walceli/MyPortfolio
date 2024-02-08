import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './app/Home';
import reportWebVitals from './reportWebVitals';
import { TranslateProvider } from './translations';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'flag-icons/css/flag-icons.min.css';
import { ReadyProvider } from "./data/contexts/ReadyContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReadyProvider>
      <TranslateProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </TranslateProvider>
    </ReadyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
