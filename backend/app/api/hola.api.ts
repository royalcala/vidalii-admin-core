import Server from '../server'


const typeDefs = `

`

export function resolver1() {

}

Server.api.type.push(typeDefs)
Server.api.resolver.push(resolver1)