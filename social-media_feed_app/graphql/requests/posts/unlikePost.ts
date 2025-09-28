import { gql } from "@apollo/client";

export const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($postId: Int!) {
    unlikePost(postId: $postId) {
      success
    }
  }
`;