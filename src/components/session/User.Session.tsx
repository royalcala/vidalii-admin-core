import React from 'react';
import Login from './User.Signin.one.rcontext'
import Admin from '../admin/Admin';

// type Props = {
//     admin: JSX.Element,
//     login: JSX.Element
// }

export default function UserSession() {
    const [session, setSession] = React.useState(false)

    if (session)
        return <Admin />
    else {
        //@ts-ignore
        return <Login setSession={
            () => {
                setSession(true)
            }} />
    }
}