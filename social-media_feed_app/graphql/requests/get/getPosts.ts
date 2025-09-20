import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      id
      author {
        id
        username
      }
      content
      imageUrl
      createdAt
      likeCount
      commentCount
      shareCount
    }
  }
`;