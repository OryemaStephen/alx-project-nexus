import { gql } from "@apollo/client";

export const GET_COMMENTS_QUERY = gql`
  query GetComments($postId: Int!) {
    comments(postId: $postId) {
      id
      user {
        username
        profilePicture
      }
      content
      createdAt
    }
  }
`;