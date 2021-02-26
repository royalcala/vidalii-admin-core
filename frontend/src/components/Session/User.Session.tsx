import React, { useState } from 'react';
import type { Dispatch } from 'react'
import { useMutation } from "../endpoint/Endpoint";
const gqlSession = `mutation UserSession{
    
}` //return object type  here 

type TSession = {
    gql: {
        mutation: string
    },
    token: string | null,
    user: object,
}
export const SessionContext = React.createContext<{ session: TSession, setSession: Dispatch<TSession> }>({} as any)

type Props = {
    admin: JSX.Element,
    login: JSX.Element
}


export function useSignin() {
    useMutation('{query here{mutationfield(username,password)}}')
}

export default function UserSession({ admin, login }: Props) {
    const [session, setSession] = useState<TSession>({
        gql: {
            mutation: gqlSession
        },
        token: null,
        user: {},
    })

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {
                session.token
                    ? admin
                    : login
            }
        </SessionContext.Provider>
    )
}