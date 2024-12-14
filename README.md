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



## Technologies Used

- Node.js
- Next.js
- Apollo Server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Git
- Nginx
- PM2
- NPM
- pNPM

### Installation

1. Clone the repository:

```sh
   git clone https://github.com/kadabite/kadabite-frontend.git
   cd kadabite-frontend
```

2. Install dependencies using pnpm:

```bash
    pnpm install
```


3. Start the application, ensure you are in the root folder of the project

```bash
    pnpm start
```

4. To run development build

```bash
    pnpm run build
    pnpm run pm2:start
```

5. The server will start on the port specified in the environment variables (default is 3000).

### Environment Variables


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