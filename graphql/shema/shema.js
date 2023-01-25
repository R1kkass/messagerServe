const { buildSchema } = require('graphql')

const schema = buildSchema(
    `
        type User {
            id: ID,
            email: String,
            password: String,
            post: [Post]
        }

        type Like {
            id: ID,
            userId: ID,
            postId: ID
        }

        type Post {
            id: ID,
            title: String,
            content: String
        }

        input UserInput{
            id: ID,
            email: String,
            password: String,
            firstName: String,
            lastName: String,
            role: String
        }
        
        input LikeInput{
            postId: ID,
            userId: ID
        }

        type Query{
            getAllUser: [User],
            getOneUser(id: ID): User,
            getOneLike(input: LikeInput): Like, 
        }

        type Mutation{
            createUser(input: UserInput): User,
            updateUser(input: UserInput): User,
            createLike(input: LikeInput): Like,
            deleteOneLike(input: LikeInput): Like
        }
    `
)

module.exports=schema