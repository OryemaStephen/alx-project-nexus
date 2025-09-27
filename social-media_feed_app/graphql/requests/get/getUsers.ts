import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      username
      email
      bio
      profilePicture
    }
  }
`;