import { gql } from 'apollo-server-micro';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { resolvers } from '@/app/api/graphql/_resolvers/resolvers';

const typeDefs = `#graphql

input OrderItem2 {
  id: ID!
  quantity: Int
  comments: String
  ratings: Int
}

input OrderItems {
  productId: ID!
  quantity: Int
  comments: String
  ratings: Int
}

input updateProduct {
  name: String
  description: String
  price: Int
  currency: String,
  photo: String
}

type Category {
  id: ID!
  name: String!
  products: [Product]
}

type Country {
  id: ID!
  name: String!
  states: [State]
}

type Lga {
  id: ID!
  name: String!
  state: State
}

type Location {
  id: ID
  name: String
  longitude: String
  latitude: String
}

type Message {
  message: String
  token: String
  id: ID
  userData: User
  usersData: [Users]
  foodsData: [Restaurant]
  orderData: Order
  ordersData: [Order]
  productData: Product
  productsData: [Product]
  orderItemsData: [OrderItem]
  orderItemData: OrderItem
  paymentsData: [Payment]
  paymentData: Payment
  categoryData: Category
  categoriesData: [Category]
  locationsData: [Location]
  statesData: [State]
  lgasData: [Lga]
  countriesData: [Country]
  statusCode: Int!
  ok: Boolean!
  refreshToken: String
}

type Mutation {
  addUserLocation(
    address: String!
    lga: String
    state: String
    country: String
    longitude: String
    latitude: String
  ): Message!
  createCategory(name: String!): Message!
  createCategories(name: [String!]!): Message!
  createLocation(location: String!): Message!
  createOrder(
    sellerId: ID!
    dispatcherId: ID
    deliveryAddress: String!
    orderItems: [OrderItems]!
  ): Message!
  createPayment(
    orderId: ID!
    paymentMethod: String!
    currency: String!
    sellerAmount: Int!
    dispatcherAmount: Int!
  ): Message!
  createProduct(
    name: String!,
    description: String!,
    price: Int!,
    currency: String!,
    categoryId: ID!): Message!
  createUser(
    email: String
    password: String!
    phoneNumber: String
  ): Message!
  deleteAnOrderItem(orderId: ID!, orderItemId: ID!): Message!
  deleteCategory(id: ID!): Message!
  deleteOrder(orderId: ID!): Message!
  deleteOrderItemsNow(ids: [ID]!): Message!
  deleteProduct(id: ID!): Message!
  deleteUser: Message!
  deleteUserLocation(locationId: ID!): Message!
  forgotPassword(email: String!): Message!
  registerUser(
    firstName: String!
    lastName: String!
    username: String!
    userType: String!
    email: String!
    phoneNumber: String!
    longitude: String
    latitude: String
    lga: String!
    state: String!
    country: String!
    address: String!
    vehicleNumber: String
  ): Message!
  updateOrder(orderId: ID!, status: String!): Message!
  updateOrderItems(orderId: ID!, orderItems: [OrderItem2]!): Message!
  updatePassword(email: String!, token: String!, password: String!): Message! 
  updatePayment(
    paymentId: ID!
    status: String!
  ): Message!
  updateProduct(
    orderId: ID!,
    deliveryAddress: String!,
    recievedByBuyer: Boolean,
    deliveredByDispatcher: Boolean): Message!
  updateUser(
    firstName: String
    lastName: String
    buyerStatus: String
    sellerStatus: String
    dispatcherStatus: String
    vehicleNumber: String
  ): Message!
  updateUserLocation(
    locationId: ID!
    address: String!
    lga: String!
    state: String!
    country: String!
    longitude: String!
    latitude: String!
  ): Message!
}

type Order {
  id: ID!
  sellerId: ID!
  buyerId: ID!
  dispatcherId: ID
  orderDateTime: String!
  timeOfDelivery: String
  deliveryAddress: String!
  currency: String!
  totalAmount: Int!
  status: String!
  orderItems: [String]!
  payment: [Payment]
  paymentToken: String
}

type OrderItem {
  id: ID!
  productId: ID!
  quantity: Int
  comments: String
  ratings: Int
}

type Payment {
  id: ID!
  orderId: ID!
  paymentDateTime: String!
  paymentMethod: String
  currency: String!
  totalAmount: Int!
  paymentStatus: String!
}

type Payments {
  id: ID!
  paymentDateTime: String
  lastUpdateTime: String!
  paymentMethod: String!
  currency: String!
  sellerAmount: Int!
  dispatcherAmount: Int!
  sellerPaymentStatus: String!
  dispatcherPaymentStatus: String!
}

type Product {
  id: ID!
  name: String!
  description: String!
  price: Int!
  createdAt: String!
  updatedAt: String!
  currency: String!
  photo: String
  categoryId: String
}

type Query {
  category(id: ID!): Message!
  categories: Message!
  findFoods(productName: String!): Message!
  getAllOrders: Message!
  getAllProducts: Message!
  getAllProductsOfUsersByCategory(categoryId: ID!): Message!
  getAnOrderItem(orderItemId: ID!): Message!
  getMyOrderItems(orderId: ID!): Message!
  getMyOrders: Message!
  getMyPayments(orderId: ID!): Message!
  getNewAccessToken(refreshToken: String!): Message!
  getOrderById(orderId: ID!): Message!
  getProduct(id: ID!): Message!
  getStates(country: String!): Message!
  getLgas(state: String!): Message!
  getCountries: Message!
  getTheOrderAsDispatcher: Message!
  getTheOrderAsSeller: Message!
  getUserLocations: Message!
  getUserProducts: Message!
  thirdPartyUser(username: String!): ThirdPartyUser!
  user: Message!
  users: Message!
}

type Restaurant {
  id: ID!
  name: String!
  description: String
  price: Float
  currency: String
  userId: ID!
  username: String!
  businessDescription: String
  products: [String]!
  phoneNumber: String
  email: String!
  createdAt: String!
  photo: String
  addressSeller: [Location]
}

type State {
  id: ID!
  name: String!
  country: Country
}

type User {
  id: ID!
  firstName: String
  lastName: String
  username: String
  email: String
  createdAt: String!
  updatedAt: String!
  phoneNumber: String
  vehicleNumber: String
  isLoggedIn: Boolean
  isDeleted: Boolean
  userType: String
  buyerStatus: String
  sellerStatus: String
  dispatcherStatus: String
  photo: String
  addressSeller: [Location]
  addressBuyer: [Location]
  addressDispatcher: [Location]
  businessDescription: String
  products: [String]!
  locations: [String]!
}

type Users {
  firstName: String
  lastName: String
  username: String
  phoneNumber: String
  email: String
  role: String!
}

type ThirdPartyUser {
  username: String!
  email: String!
  passwordHash: String!
}
`;

// export const schema = {
//   typeDefs,
//   resolvers,
// };

export default typeDefs;
