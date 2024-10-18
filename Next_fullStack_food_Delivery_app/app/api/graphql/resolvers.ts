import { userMutationResolvers, userQueryResolvers } from '@/app/api/graphql/resolvers/user&category.resolver';
import { productQueryResolver, productMutationResolver } from '@/app/api/graphql/resolvers/products.resolver';
import { ordersMutationResolver, ordersQueryResolver } from '@/app/api/graphql/resolvers/orders.resolver';
import { paymentMutationResolver, paymentQueryResolver } from '@/app/api/graphql/resolvers/payment.resolver';
import { locationMutationResolvers, locationQueryResolvers } from '@/app/api/graphql/resolvers/location.resolver';

const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...productQueryResolver,
    ...ordersQueryResolver,
    ...paymentQueryResolver,
    ...locationQueryResolvers,
  },

  Mutation: {
    ...userMutationResolvers,
    ...productMutationResolver,
    ...ordersMutationResolver,
    ...paymentMutationResolver,
    ...locationMutationResolvers,
  },
};

export default resolvers;
