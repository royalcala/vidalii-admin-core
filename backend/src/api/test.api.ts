import Vidalii from '../vidaliiService'


const typeDefs = `
type Query {
    test: String
  }
`

function test() {
  return `my test`
}

Vidalii.addType('Query.test', typeDefs)

Vidalii.addResolver('Query', test)