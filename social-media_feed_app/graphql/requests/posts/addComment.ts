import { gql } from "@apollo/client";

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($postId: Int!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      comment {
        id
        user {
          username
          profilePicture
        }
        content
        createdAt
      }
    }
  }
`;