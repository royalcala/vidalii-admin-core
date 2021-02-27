//CORE
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CssBaseline from 'template-core/CssBaseline';
import { ThemeProvider } from 'template-core/styles';
import {
  BrowserRouter as Router,
} from "react-router-dom";


//TODO alias
import Admin from './components/imports/admin/Admin';
import { theme } from './theme';
import UserSession from "./components/Session/User.Session";
import Login from './components/Session/User.Signin.one.rcontext'


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserSession login={<Login />} admin={<Admin />} />
        </ThemeProvider>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
