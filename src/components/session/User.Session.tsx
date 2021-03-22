import React from 'react';
import Login from './Admin.Signin'
import Admin from '../admin/Admin';
import { Client } from "../..";
import SimpleDialog from "../dialogs/simple";
import { gql } from "graphql-request";

export const Session = React.createContext<{
    session: null | string,
    closeSession: () => void
}>({ session: null, closeSession: () => { } })
const query = gql`#graphql
          mutation Login($username:String!, $password:String!){
              sessionLogin(
                username:$username,
                password:$password
              )
        }
      `
const AUTH = 'authorization'
export default function UserSession() {
    // getter
    const [session, setSession] = React.useState(localStorage.getItem(AUTH))

    // remove
    // localStorage.removeItem('myData');
    const [openAlert, setOpenAlert] = React.useState({
        msg: '',
        open: false
    })
    const { client } = React.useContext(Client)
    const checkSession = async (username: string, password: string) => {
        try {
            const response = await client.request(
                query,
                { username, password }
            )
            client.setHeader(AUTH, response.sessionLogin)
            localStorage.setItem(AUTH, response.sessionLogin)
            setSession(response.sessionLogin)
        } catch (error) {
            const msg = error?.response?.errors[0]?.message || error
            setOpenAlert({
                msg,
                open: true
            })

        }
    }

    if (session) {
        client.setHeader('authorization', session)
        return (           
            <Session.Provider value={{ session, closeSession:()=>{
                localStorage.removeItem(AUTH)
                setSession(null)
            } }}>
                <Admin />
            </Session.Provider>
        )
    }
    else {
        return (
            <>
                <SimpleDialog msg={openAlert.msg} open={openAlert.open} close={() => { setOpenAlert({ msg: '', open: false }) }} />             
                <Login checkSession={checkSession} />
            </>

        )
    }
}