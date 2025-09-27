import { gql } from "@apollo/client";

export const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($userId: Int!) {
    unfollowUser(userId: $userId) {
      follow {
        id
      }
    }
  }
`;