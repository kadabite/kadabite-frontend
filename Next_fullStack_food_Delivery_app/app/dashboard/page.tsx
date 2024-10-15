'use client';

import { useQuery } from '@apollo/client';
import withAuth from '@/app/hoc/withAuth';
import { GET_USERS } from '@/app/query/user.query';
import LogoutButton from '@/app/ui/logout-button';
import Loading from '@/app/ui/loading'
// import { CREATE_NEW_LOCATION } from '@/app/query/location.query';
// import { useMutation } from '@apollo/client';
// import { Button } from '@/app/ui/button';

interface User { 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
}

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  // const [setLocation, { loading:myLoading, error: myError, data: myData }] = useMutation(CREATE_NEW_LOCATION, {
  //   variables: { location: 'Nigeria' },
  //   onError: (myError) => {
  //     console.error('Error fetching location:', error);
  //   },
  // });

  if (loading) {
    return (<Loading />);
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.users.usersData?.map((user: User, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{user.firstName} {user.lastName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LogoutButton />
      {/* <Button className="w-full bg-gray-500 text-orange-900 border border-gray-200" onClick={() => setLocation()}>Set locations </Button>
      {myData && myData.ok && <p className="text-green-500 text-center">{myData.message}</p>}
      {myLoading && <p className="text-red-500 text-center">loading ...</p>} */}

    </div>
  );
};

export default withAuth(Dashboard);
