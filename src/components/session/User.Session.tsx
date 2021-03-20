import React from 'react';
import Login from './User.Signin.one.rcontext'
import Admin from '../admin/Admin';
import { Client } from "../..";
import SimpleDialog from "../dialogs/simple";
import { gql } from "graphql-request";

// type Props = {
//     admin: JSX.Element,
//     login: JSX.Element
// }
const query = gql`#graphql
          mutation Login($username:String!, $password:String!){
              sessionLogin(
                username:$username,
                password:$password
              )
        }
      `
export default function UserSession() {
    // getter
    const [session, setSession] = React.useState(localStorage.getItem('jwt'))

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
            client.setHeader('authorization', response.sessionLogin)
            localStorage.setItem('jwt', response.sessionLogin)
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
        return <Admin />
    }
    else {
        return (
            <>
                <SimpleDialog msg={openAlert.msg} open={openAlert.open} close={() => { setOpenAlert({ msg: '', open: false }) }} />
                {/* @ts-ignore */}
                <Login checkSession={checkSession} />
            </>

        )
    }
}