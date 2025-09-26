import { gql } from "@apollo/client";

export const GET_POST_QUERY = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      id
      author {
        username
        profilePicture
      }
      content
      imageUrl
      createdAt
    }
  }
`;