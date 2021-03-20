//CORE
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CssBaseline from 'template-core/CssBaseline';
import { ThemeProvider } from 'template-core/styles';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { theme } from './components/theme';
import UserSession from "./components/session/User.Session";

import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient('http://localhost:4009/graphql')
export const Client = React.createContext({
  client
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Client.Provider value={{
        client
      }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserSession/>
        </ThemeProvider>
      </Client.Provider>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
