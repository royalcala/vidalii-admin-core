import Vidalii from '../vidalii'
import { Author } from './Author.entity'
import type { Context } from '../vidalii'
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


Vidalii.api.addType('Query.test', typeDefs)

Vidalii.api.addResolver('Query', test)