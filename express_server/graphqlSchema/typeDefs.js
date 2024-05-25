import { buildSchema } from 'graphql';

const typeDefs = buildSchema(`#graphql

  type Message {
    message: String!,
    token: String
  }

  type Location {
    id: ID
    name: String
    longitude: String
    latitude: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    phoneNumber: String
    lgaId: String
    vehicleNumber: String
    isLoggedIn: Boolean
    isDeleted: Boolean
    userType: String
    buyerStatus: String
    sellerStatus: String
    dispatcherStatus: String
    photo: String
    address_seller: [Location]
    address_buyer: [Location]
    address_dispatcher: [Location]
    products: [String]!
  }

  type Users {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product]
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
    paymentDateTime: String!
    paymentMethod: String!
    currency: String!
    totalAmount: Int!
    paymentStatus: String!
  }

  type Order {
    id: ID!
    sellerId: ID!
    buyerId: ID!
    dispatcherId: ID
    orderDateTime: String!
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

  input OrderItems {
    productId: ID!
    quantity: Int
    comments: String
    ratings: Int
  }

  input OrderItem2 {
    id: ID!
    quantity: Int
    comments: String
    ratings: Int
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

  input updateProduct {
    name: String
    description: String
    price: Int
    currency: String,
    photo: String
  }

  type Query {
    users: [Users]!
    user: User
    category(id: ID!): Category
    categories: [Category]!
    getProduct(id: ID!): Product
    getUserProducts: [Product]!
    getAllProducts: [Product]!
    getAllProductsOfUsersByCategory(categoryId: ID!): [Product]!
    getAllOrders: [Order]!
    getMyOrders: [Order]!
    getMyOrderItems(orderId: ID!): [OrderItem]!
    getTheOrderAsSeller: [Order]!
    getTheOrderAsDispatcher: [Order]!
    getAnOrderItem(orderItemId: ID!): OrderItem
    getMyPayment(orderId: ID!): [Payments]!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      passwordHash: String!
      phoneNumber: String!
      userType: String
      buyerStatus: String!
      sellerStatus: String
      dispatcherStatus: String
      lgaId: String
      vehicleNumber: String
    ): User

    updateUser(
      firstName: String
      lastName: String
      username: String
      email: String
      phoneNumber: String
      userType: String
      buyerStatus: String
      sellerStatus: String
      dispatcherStatus: String
      lgaId: String
      vehicleNumber: String
    ): Message!

    deleteUser: Message!
    login(email: String!, password: String!): Message!
    logout: Message!
    forgotPassword(email: String!): Message!
    updatePassword(email: String!, token: String!, password: String!): Message! 
    createCategory(name: String!): Category
    createCategories(name: [String!]!): Message!
    deleteCategory(id: ID!): Message!
    deleteOrderItemsNow(ids: [ID]!): Message!
    deleteAnOrderItem(orderId: ID!, orderItemId: ID!): Message!
    updateOrderItems(orderId: ID!, orderItems: [OrderItem2]!): Message!
    createProduct(
      name: String!,
      description: String!,
      price: Int!,
      currency: String!,
      categoryId: String!): Product
    deleteOrder(orderId: ID!): Message!
    updateOrderAddress(orderId: ID!, deliveryAddress: String!): Message!
    deleteProduct(id: ID!): Message!
    updateProduct(id: ID!, product: updateProduct, categoryId: ID!): Product
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
      paymentStatus: String!
    ): Message!
  }
`);

export default typeDefs;
