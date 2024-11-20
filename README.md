# DELIVER APP

A delivery application connecting buyers, sellers, and dispatchers.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Unittesting](#unittesting)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Deliver App is a delivery application that connects buyers, sellers, and dispatchers. It provides a platform for users to manage orders, products, payments, and more through a GraphQL API.

## Features

- User authentication and authorization
- Product management
- Order management
- Payment processing
- Rate limiting
- Logging
- GraphQL API with Apollo Server

## Technologies Used

- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- dotenv
- bcrypt
- cors
- body-parser
- express-rate-limit
- graphql-shield
- graphql-rate-limit

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional, for containerized deployment)
- Redis server

### Installation

1. Clone the repository:

```sh
   git clone https://github.com/dominic-source/Express_food_delivery_backend.git
   cd Express_food_delivery_backend
```

2. Install dependencies using pnpm:

```bash
    pnpm install
```

3. Set permissions for database_mongo folder, this will preserve our database data

```bash
    chmod 777 -R ./database_mongo
```

4. Run docker compose to start mongodb

```bash
    docker compose up -d
```

5. Ensure that redis server is installed and start it

6. Open a new terminal and start consumer precess

```bash
    cd utils
    node consumer.js
```

7. Start the application, ensure you are in the root folder of the project

```bash
    pnpm start
```

8. The server will start on the port specified in the environment variables (default is 5000).

### Environment Variables

```bash
DELIVER_MONGODB_HOST=localhost
DELIVER_MONGODB_DB=example_db
DELIVER_MONGODB_USER=example_user
DELIVER_MONGODB_PWD=example_pwd
DELIVER_MONGODB_PORT=port_number
DELIVER_MONGODB_URL="example uri"
DELIVER_URL=http://localhost:3000
SECRET_KEY=secret_key
FRONTEND_URL="http://localhost:3000"
```

### Project Structure

```plaintext
.├── app
│   ├── api
│   │   ├── graphql
│   │   │   └── utils.ts
│   │   └── upload
│   │       ├── logger.ts
│   │       └── route.ts
│   ├── ApolloClientProvider.tsx
│   ├── dashboard
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── [userId]
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── forgotPassword
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── hoc
│   │   └── withAuth.tsx
│   ├── layout.tsx
│   ├── lib
│   │   ├── actions.ts
│   │   ├── data.ts
│   │   ├── definitions.ts
│   │   ├── placeholder-data.ts
│   │   ├── settings.ts
│   │   └── utils.ts
│   ├── login
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.png
│   ├── page.tsx
│   ├── query
│   │   ├── location.query.ts
│   │   └── user.query.ts
│   ├── register
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── resetPassword
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── signup
│   │   └── page.tsx
│   └── ui
│       ├── acme-logo.tsx
│       ├── address-form.tsx
│       ├── button.tsx
│       ├── customers
│       │   └── table.tsx
│       ├── dashboard
│       │   ├── cards.tsx
│       │   ├── latest-invoices.tsx
│       │   ├── nav-links.tsx
│       │   ├── revenue-chart.tsx
│       │   └── sidenav.tsx
│       ├── fonts.ts
│       ├── global.css
│       ├── home.module.css
│       ├── image-text.tsx
│       ├── invoices
│       │   ├── breadcrumbs.tsx
│       │   ├── buttons.tsx
│       │   ├── create-form.tsx
│       │   ├── edit-form.tsx
│       │   ├── pagination.tsx
│       │   ├── status.tsx
│       │   └── table.tsx
│       ├── landing_page
│       │   ├── carausel.tsx
│       │   ├── slidein.tsx
│       │   └── ToggleMenu.tsx
│       ├── loading.tsx
│       ├── login-form.tsx
│       ├── logout-button.tsx
│       ├── newsletterForm.tsx
│       ├── register-form.tsx
│       ├── search.tsx
│       └── skeletons.tsx
├── codegen.yml
├── lib
│   └── apolloClient.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── customers
│   │   ├── amy-burns.png
│   │   ├── evil-rabbit.png
│   │   ├── lee-robinson.png
│   │   └── michael-novotny.png
│   ├── hero-desktop.png
│   ├── hero-mobile.png
│   └── landing_page
│       ├── black2.png
│       ├── choose_meal.jpg
│       ├── linkedIn.png
│       ├── logo.png
│       ├── meal_mockup3.jpg
│       ├── place_order.jpg
│       ├── testimonial1.jpg
│       ├── testimonial2.jpg
│       ├── track_delivery.jpg
│       └── x.png
├── README.md
```

## API Endpoints

### GraphQL Endpoints

- `/graphql`: Main GraphQL endpoint for querying and mutating data.

### REST Endpoints

- `/api`: RESTful API routes for additional functionalities.

## Unittesting

```bash
    npm test
```

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the expected behavior in our community.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
