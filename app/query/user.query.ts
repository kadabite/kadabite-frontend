import { gql } from '@apollo/client';

export const GET_WAITLIST = gql `
  query getWaitList {
    getWaitList {
      message
      statuscode
      ok
      waitListData {
        email
        lga
        state
        country
        createdAt
      }
    }
  }
`;

export const SUBSCRIBE_USER = gql`
  mutation subscribeUser($email: String!) {
    newsletter(email: $email) {
      message
      statusCode
      ok
      emailToken
    }
  }
`;

export const ADD_WAITLIST = gql`
  mutation addWaitlist($email: String!, $lga: String!, $state: String!, $country: String!, $address: String) {
    waitlist(email: $email, lga: $lga, state: $state, country: $country, address: $address) {
      message
      statusCode
      ok
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser(
    $email: String
    $phoneNumber: String!
    $password: String!
  ) {
    createUser(
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      statusCode
      ok
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $vehicleNumber: String
    $username: String
    $longitude: String
    $latitude: String
    $lga: String
    $state: String
    $country: String
    $address: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      vehicleNumber: $vehicleNumber
      username: $username
      longitude: $longitude
      latitude: $latitude
      lga: $lga
      state: $state
      country: $country
      address: $address
    ) {
      statusCode
      ok
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $userType: String!
    $vehicleNumber: String
    $username: String!
    $longitude: String
    $latitude: String
    $lga: String!
    $state: String!
    $country: String!
    $address: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      email: $email
      phoneNumber: $phoneNumber
      vehicleNumber: $vehicleNumber
      username: $username
      longitude: $longitude
      latitude: $latitude
      lga: $lga
      state: $state
      country: $country
      address: $address
    ) {
      statusCode
      ok
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation updatePassword($email: String!, $password: String!, $token: String!) {
    updatePassword(email: $email, password: $password, token: $token) {
      message
      statusCode
      ok
    }
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      statusCode
      ok
    }
  }
`;
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
            refreshToken
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

export const GET_USERS_DATA = gql`
    query getUser {
      user {
        statusCode
        ok
        userData {
          firstName
          lastName
          email
          phoneNumber
          username
        }
      }
    }
`;
