import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query{ 
    repositories {
        edges{
            node{
              id
              ownerAvatarUrl
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
              language
            }
        }
    }
  }
`;

export const GET_AUTHORIZEDUSER = gql`
  query{
    me {
      id
      username
    }
  }
`;