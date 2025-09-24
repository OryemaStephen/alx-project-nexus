import { gql } from "@apollo/client";

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId) {
      like {
        id
        user {
          username
          profilePicture
        }
        post {
          id
        }
        createdAt
      }
    }
  }
`;
