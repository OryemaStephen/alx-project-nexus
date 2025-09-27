import { gql } from "@apollo/client";

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($userId: Int!) {
    followers(userId: $userId) {
      id
      username
      email
      bio
      profilePicture
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($userId: Int!) {
    following(userId: $userId) {
      id
      username
      email
      bio
      profilePicture
    }
  }
`;