// export const ADD_USER = gql`
//   mutation addUser(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//     $isAdmin:Boolean
//   ) {
//     addUser(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       password: $password
//       isAdmin:$isAdmin
//     ) {
//       token
//       user {
//         _id
//       }
//     }
//   }