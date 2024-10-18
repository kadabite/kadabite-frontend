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

export const ADD_LOCATION = gql`
  mutation addUserLocation($address: String!, $state: String, $country: String, $lga: String) {
    addUserLocation(address: $address, state: $state, country: $country, lga: $lga) {
      message
      statusCode
      ok
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation deleteUserLocation($locationId: ID!) {
    deleteUserLocation(locationId: $locationId) {
      message
      statusCode
      ok
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation updateUserLocation($locationId: ID!, $address: String!, $state: String!, $country: String!, $lga: String!, $longitude: String!, $latitude: String!) {
    updateUserLocation(locationId: $locationId, address: $address, state: $state, country: $country, lga: $lga, longitude: $longitude, latitude: $latitude) {
      message
      statusCode
      ok
    }
  }
`;

export const GET_USER_LOCATIONS = gql`
  query getUserLocations {
    getUserLocations {
      locationsData {
        id
        name
        longitude
        latitude
      }
      message
      ok
      statusCode
    }
  }
`;
