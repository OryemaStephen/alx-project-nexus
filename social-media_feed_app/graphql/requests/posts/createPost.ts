import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!, $imageUrl: String) {
  createPost(content: $content, imageUrl: $imageUrl) {
    post {
      id
      author {
        id
        username
      }
      content
      imageUrl
      createdAt
    }
  }
}
`;