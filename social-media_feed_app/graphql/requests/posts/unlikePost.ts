import { gql } from "@apollo/client";

export const UNLIKE_POST_MUTATION = gql`
 mutation {
  unlikePost(postId: 123) {
    success
  }
}
`;
