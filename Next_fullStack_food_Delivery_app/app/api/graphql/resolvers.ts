import { userMutationResolvers, userQueryResolvers } from '@/app/api/graphql/resolvers/user&category.resolver';
import { productQueryResolver, productMutationResolver } from '@/app/api/graphql/resolvers/products.resolver';
import { ordersMutationResolver, ordersQueryResolver } from '@/app/api/graphql/resolvers/orders.resolver';
import { paymentMutationResolver, paymentQueryResolver } from '@/app/api/graphql/resolvers/payment.resolver';

const resolvers = {
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

export default resolvers;
