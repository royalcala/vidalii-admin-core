import Vidalii from '../vidaliiService'
import { Author } from './Author.entity'
import type { Context } from '../vidaliiService'
const typeDefs = `
type Author{
  name: String
}
type Query {
    test: String
    #AuthorSelect:Author
  }
type Mutation {
  AuthorInsert(name:String):Author
  
}
`

function test() {
  return `my test`
}
function AuthorInsert(parent, args: { name: String }, cxt: Context) {
  const author = new Author()
  author.name = args.name
  cxt.em.persist(author)
}


Vidalii.addType('Query.test', typeDefs)

Vidalii.addResolver('Query', test)