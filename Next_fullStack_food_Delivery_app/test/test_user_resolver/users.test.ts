import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import { User } from '@/models/user';
import { userQueryResolvers } from '@/app/api/graphql/_resolvers/user&category.resolver';
import { Types } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('users', function() {
  // let findStub;
  // let fetchStub;

  // beforeEach(function() {
  //   // stud authRequest
  //   fetchStub = stub(fetch, 'default').resolves({
  //     ok: true,
  //     json: stub().returns({
  //       user: {
  //         _id: new Types.ObjectId(),
  //       },
  //       isAdmin: true
  //     }),
  //     status: 200
  //   });
  //   findStub = stub(User, 'find');
  // });

  afterEach(function() {
    restore();
  });

  it('should return all the users', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
},
        isAdmin: true
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    stub(User, 'find').resolves(user);
    const user = [
      {
        id: new Types.ObjectId(),
        name: 'user1',
        email: 'user1@example.com',
      },
      {
        id: new Types.ObjectId(),
        name: 'user2',
        email: 'user2@example.com',
      },
    ];
    const result = await userQueryResolvers.users(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
    });
    expect(result.statusCode).to.equal(200);
    expect(result.ok).to.equal(true);
  });

  it('should return an empty array if there are no users', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
},
        isAdmin: true
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    stub(User, 'find').resolves([]);
    const result = await userQueryResolvers.users(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
    });
    expect(result).to.deep.equal({ usersData: [], statusCode: 200, ok: true });
  });

  it('should return an empty array if an exception is raised', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
},
        isAdmin: true
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    stub(User, 'find').throws(new Error('Error fetching users'));
    const result = await userQueryResolvers.users(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
  
    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false});
  });
});
