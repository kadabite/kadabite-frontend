export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found!') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class LocationNotFoundError extends Error {
  constructor(message: string = 'Location not found!') {
    super(message);
    this.name = 'LocationNotFoundError';
  }
}

export class DeletionError extends Error {
  constructor(message: string = 'Could not delete location, try again later.') {
    super(message);
    this.name = 'DeletionError';
  }
}

export class CountryNotFoundError extends Error {
  constructor(message: string = 'This country is not available here!') {
    super(message);
    this.name = 'CountryNotFoundError';
  }
}

export class StateNotFoundError extends Error {
  constructor(message: string = 'This state is not available here!') {
    super(message);
    this.name = 'StateNotFoundError';
  }
}

export class LgaNotFoundError extends Error {
  constructor(message: string = 'This LGA is not available here!') {
    super(message);
    this.name = 'LgaNotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'Contact the admin to take this action!') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message: string = 'User already exists!') {
    super(message);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string = 'Invalid credentials!') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class CategoryNotFoundError extends Error {
  constructor(message: string = 'Category not found!') {
    super(message);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategoryAlreadyExistsError extends Error {
  constructor(message: string = 'Category already exists!') {
    super(message);
    this.name = 'CategoryAlreadyExistsError';
  }
}

export class InvalidCategoryFormatError extends Error {
  constructor(message: string = 'Invalid category format!') {
    super(message);
    this.name = 'InvalidCategoryFormatError';
  }
}

export class OrderNotFoundError extends Error {
  constructor(message: string = 'Order not found!') {
    super(message);
    this.name = 'OrderNotFoundError';
  }
}

export class InvalidOrderItemsError extends Error {
  constructor(message: string = 'Invalid order items!') {
    super(message);
    this.name = 'InvalidOrderItemsError';
  }
}

export class OrderItemNotFoundError extends Error {
  constructor(message: string = 'Order item not found!') {
    super(message);
    this.name = 'OrderItemNotFoundError';
  }
}

export class PaymentError extends Error {
  constructor(message: string = 'Payment error!') {
    super(message);
    this.name = 'PaymentError';
  }
}


export class InvalidInputError extends Error {
  constructor(message: string = 'Invalid input!') {
    super(message);
    this.name = 'InvalidInputError';
  }
}

export class SellerNotFoundError extends Error {
  constructor(message: string = 'Seller not found!') {
    super(message);
    this.name = 'SellerNotFoundError';
  }
}

export class DispatcherNotFoundError extends Error {
  constructor(message: string = 'Dispatcher not found!') {
    super(message);
    this.name = 'DispatcherNotFoundError';
  }
}

export class ProductNotFoundError extends Error {
  constructor(message: string = 'Product not found!') {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

export class DispatcherNotAvailableError extends Error {
  constructor(message: string = 'Dispatcher is not available!') {
    super(message);
    this.name = 'DispatcherNotAvailableError';
  }
}

export class PaymentNotFoundError extends Error {
  constructor(message: string = 'Payment not found!') {
    super(message);
    this.name = 'PaymentNotFoundError';
  }
}

export class InvalidPaymentMethodError extends Error {
  constructor(message: string = 'Invalid payment method!') {
    super(message);
    this.name = 'InvalidPaymentMethodError';
  }
}

export class InvalidCurrencyError extends Error {
  constructor(message: string = 'Invalid currency!') {
    super(message);
    this.name = 'InvalidCurrencyError';
  }
}

export class InvalidAmountError extends Error {
  constructor(message: string = 'Invalid amount!') {
    super(message);
    this.name = 'InvalidAmountError';
  }
}

export class ProductAlreadyExistsError extends Error {
  constructor(message: string = 'Product already exists!') {
    super(message);
    this.name = 'ProductAlreadyExistsError';
  }
}