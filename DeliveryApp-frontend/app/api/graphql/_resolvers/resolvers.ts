import { userMutationResolvers, userQueryResolvers } from '@/app/api/graphql/_resolvers/user&category.resolver';
import { productQueryResolver, productMutationResolver } from '@/app/api/graphql/_resolvers/products.resolver';
import { ordersMutationResolver, ordersQueryResolver } from '@/app/api/graphql/_resolvers/orders.resolver';
import { paymentMutationResolver, paymentQueryResolver } from '@/app/api/graphql/_resolvers/payment.resolver';

export const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...productQueryResolver,
    ...ordersQueryResolver,
    ...paymentQueryResolver,
  },

  Mutation: {
    ...userMutationResolvers,
    ...productMutationResolver,
    ...ordersMutationResolver,
    ...paymentMutationResolver,
  },
};
