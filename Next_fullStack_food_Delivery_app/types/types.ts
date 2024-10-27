export type Role = 'admin' | 'user' | 'guest';

export type Permissions = {
  addUserLocation?: boolean;
  createCategory?: boolean;
  createCategories?: boolean;
  createLocation?: boolean;
  createOrder?: boolean;
  createPayment?: boolean;
  createProduct?: boolean;
  createUser?: boolean;
  deleteAnOrderItem?: boolean;
  deleteCategory?: boolean;
  deleteOrder?: boolean;
  deleteOrderItems?: boolean;
  deleteProduct?: boolean;
  deleteUser?: boolean;
  deleteUserLocation?: boolean;
  findFoods?: boolean;
  getMyPayments?: boolean;
  registerUser?: boolean;
  updateOrder?: boolean;
  updateOrderItems?: boolean;
  updatePassword?: boolean;
  updatePayment?: boolean;
  updateProduct?: boolean;
  updateUser?: boolean;
  updateUserLocation?: boolean;
  viewCategories?: boolean;
  viewOrders?: boolean;
  viewAllOrders?: boolean;
  viewProducts?: boolean;
  viewUsers?: boolean;
  viewLocations?: boolean;
  viewStates?: boolean;
  viewLgas?: boolean;
  viewCountries?: boolean;
  viewUser?: boolean;
  viewCategory?: boolean;
};

export type RoleBasedAccessControl = {
  [key in Role]: Permissions;
};
