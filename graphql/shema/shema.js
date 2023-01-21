const { buildSchema } = require('graphql')

const schema = buildSchema(
    `
        type User {
            id: ID,
            email: String,
            password: String,
            post: [Post]
        }

        type Post {
            id: ID,
            title: String,
            content: String
        }

        input UserInput{
            id: ID,
            email: String!,
            password: String!,
            firstName: String,
            lastName: String,
            role: String
        }

        type Query{
            getAllUser: [User],
            getOneUser(id: ID): User
        }

        type Mutation{
            createUser(input: UserInput): User
        }
    `
)

module.exports=schema