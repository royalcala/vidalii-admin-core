import Server from '../server'


const typeDefs = `
type Query {
    hello: String
  }
`

function resolver1() {

}

// Server.api.type.push(typeDefs)
// Server.api.resolver.push(resolver1)