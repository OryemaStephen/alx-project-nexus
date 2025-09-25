import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!, $image: Upload) {
  createPost(content: $content, image: $image) {
    post {
      id
      author {
        id
        username
      }
      content
      image
      createdAt
    }
  }
}
`;