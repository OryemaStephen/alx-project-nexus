import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query Post {
    posts {
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
`;