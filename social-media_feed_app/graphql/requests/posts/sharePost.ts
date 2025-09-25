import { gql } from "@apollo/client";

export const SHARE_POST_MUTATION = gql`
  mutation SharePost($postId: Int!, $message: String) {
    sharePost(postId: $postId, message: $message) {
      share {
        id
        user {
          username
          profilePicture
        }
        post {
          id
        }
        message
        createdAt
      }
    }
  }
`;