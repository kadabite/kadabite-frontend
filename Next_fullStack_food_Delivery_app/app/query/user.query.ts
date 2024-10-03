import { gql } from '@apollo/client';

export const GET_ACCESS_TOKEN = gql`
  query getNewAccessToken($refreshToken: String!) {
    getNewAccessToken(refreshToken: $refreshToken) {
      message
      token
      statusCode
      ok
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      message
      usersData {
        firstName
        lastName
        username
        email
        role
      }
      statusCode
      ok
    }
  }
`;
export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            message
            token
            statusCode
            ok
        }
    }
`;

export const GET_DATA = gql`
    query findFoods($productName: String!) {
      findFoods(productName: $productName) {
        foodsData {
          businessDescription
          createdAt
          currency
          description
          phoneNumber
          price
          products
          name
          username
          userId
          email
          photo
        }
        message
        ok
        statusCode
      }
    }
  `;