import React from 'react';
import Login from './Admin.Signin'
import Admin from '../admin/Admin';
import SimpleDialog from "../dialog/dialog.simple";
// import { Client } from "../..";
// import { gql } from "graphql-request";
import { useMutation, ClientContext } from 'graphql-hooks'

export const Session = React.createContext<{
    session: null | string,
    closeSession: () => void
}>({ session: null, closeSession: () => { } })

const LOGIN_MUTATION = `#graphql
          mutation LoginUser($username:String!, $password:String!){
              sessionLogin(
                username:$username,
                password:$password
              )
        }
      `
const AUTH = 'authorization'
export default function UserSession() {
    const [session, setSession] = React.useState(localStorage.getItem(AUTH))
    const client = React.useContext(ClientContext)
    const [loginUserMutation] = useMutation(LOGIN_MUTATION)
    const [openAlert, setOpenAlert] = React.useState({
        msg: '',
        open: false
    })
    const checkSession = async (username: string, password: string) => {
        const { data, error } = await loginUserMutation({
            variables: { username, password }
        })
        if (error)
            setOpenAlert({
                msg: String(error),
                open: true
            })
        else {
            client.setHeader(AUTH, data.sessionLogin)
            localStorage.setItem(AUTH, data.sessionLogin)
            setSession(data.sessionLogin)
        }
    }

    if (session) {
        client.setHeader('authorization', session)
        return (
            <Session.Provider value={{
                session, closeSession: () => {
                    localStorage.removeItem(AUTH)
                    setSession(null)
                }
            }}>
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