import { userMutationResolvers, userQueryResolvers } from '@/app/api/graphql/resolvers/user&category.resolver';
import { productQueryResolver, productMutationResolver } from '@/app/api/graphql/resolvers/products.resolver';
import { ordersMutationResolver, ordersQueryResolver } from '@/app/api/graphql/resolvers/orders.resolver';
import { paymentMutationResolver, paymentQueryResolver } from '@/app/api/graphql/resolvers/payment.resolver';
import { locationMutationResolver, locationQueryResolver } from '@/app/api/graphql/resolvers/location.resolver';

const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...productQueryResolver,
    ...ordersQueryResolver,
    ...paymentQueryResolver,
    ...locationQueryResolver,
  },

  Mutation: {
    ...userMutationResolvers,
    ...productMutationResolver,
    ...ordersMutationResolver,
    ...paymentMutationResolver,
    ...locationMutationResolver,
  },
};

export default resolvers;
