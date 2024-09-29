import { gql } from '@apollo/client';

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