import { gql } from "@apollo/client";

export const GET_LIKES_QUERY = gql`
  query Likes($postId: Int!) {
    likes(postId: $postId) {
      id
      user {
        id
        username
        profilePicture
      }
      post {
        id
      }
      createdAt
    }
  }
`;