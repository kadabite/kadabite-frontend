import { gql } from '@apollo/client';

export const CREATE_NEW_LOCATION = gql`
  mutation createLocation($location: String!) {
    createLocation(location: $location) {
      message
      statusCode
      ok
    }
  }
`;

export const GET_STATES = gql`
  query getStates($country: String!) {
    getStates(country: $country) {
      statesData {
        id
        name
      }
      message
      ok
      statusCode
    }
  }
`;

export const GET_LGAS = gql`
  query getLgas($state: String!) {
    getLgas(state: $state) {
      lgasData {
        id
        name
      }
      message
      ok
      statusCode
    }
  }
`;

export const GET_COUNTRIES = gql`
  query getCountries {
    getCountries {
      countriesData {
        id
        name
      }
      message
      ok
      statusCode
    }
  }
`;
