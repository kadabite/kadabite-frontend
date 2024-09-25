import { expect } from 'chai';
import { stub } from 'sinon';
import fetch, { Response } from 'node-fetch';
import { User } from '@/models/user';
import { userMutationResolvers } from '@/app/api/graphql/_resolvers/user&category.resolver';
import { Types } from 'mongoose';

describe('deleteUser', () => {
  let findByIdAndUpdateStub;
  let userId;

  beforeEach(() => {
    findByIdAndUpdateStub = stub(User, 'findByIdAndUpdate');
    userId = new Types.ObjectId().toString();
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: userId,
          id: userId,
        },
        isAdmin: true
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
  });

  afterEach(() => {
    findByIdAndUpdateStub.restore();
  });

  it('should delete a user successfully', async () => {
    findByIdAndUpdateStub.resolves({id: "fakeid"});

    const result = await userMutationResolvers.deleteUser(
      userId, { isDeleted: true },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(result).to.deep.equal({ message: 'User deleted successfully!', statusCode: 200, ok: true });
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    expect(findByIdAndUpdateStub.calledWith(userId, { isDeleted: true })).to.be.true;
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Something went wrong');
    findByIdAndUpdateStub.rejects(error);

    const result = await userMutationResolvers.deleteUser(
      userId, { isDeleted: true },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(result).to.deep.equal({'message': 'An error occurred!', statusCode: 500, ok: false });
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
  });
});
