import { gql } from '@apollo/client';

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: Int!) {
    followUser(userId: $userId) {
      follow {
        id
        follower {
          id
          username
          email
          bio
          profilePicture
        }
        following {
          id
          username
          email
          bio
          profilePicture
        }
        createdAt
      }
    }
  }
`;