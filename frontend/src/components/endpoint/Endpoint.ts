import { useEffect, useState } from "react";
//https://moonhighway.com/fetching-data-from-a-graphql-api
//TODO context configuration or .ENV
const url = "https://snowtooth.moonhighway.com/" //from process.env
// const opts = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     // body: JSON.stringify({ query: "{ hello }" })
// };
type TEndpoint = {
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    data: null | any
}
function useEndpoint(query: string) {
    const [state, setState] = useState<TEndpoint>({
        isLoading: true,
        isError: false,
        error: null,
        data: null
    })

    useEffect(
        () => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: {}
                }),
            })
                .then(r => r.json())
                .then(data => {
                    console.log('data returned:', data)
                    setState({
                        isLoading: false,
                        isError: false,
                        error: null,
                        data
                    })
                })
                .catch(error => {
                    console.error('error returned:', error)
                    setState({
                        isLoading: false,
                        isError: true,
                        error,
                        data: null
                    })
                });
        }
    )


    return state
}


export function useQuery(query: string) {
    const state = useEndpoint(query)
    return state
}

export function useMutation(query: string) {
    const state = useEndpoint(query)
    return state
}