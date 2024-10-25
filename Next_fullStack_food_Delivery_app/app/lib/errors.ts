// errors.ts
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
