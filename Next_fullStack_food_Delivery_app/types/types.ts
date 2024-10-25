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
  deleteOrderItemsNow?: boolean;
  deleteProduct?: boolean;
  deleteUser?: boolean;
  deleteUserLocation?: boolean;
  updateOrder?: boolean;
  updateOrderItems?: boolean;
  updatePassword?: boolean;
  updatePayment?: boolean;
  updateProduct?: boolean;
  updateUser?: boolean;
  updateUserLocation?: boolean;
  viewCategories?: boolean;
  viewOrders?: boolean;
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
