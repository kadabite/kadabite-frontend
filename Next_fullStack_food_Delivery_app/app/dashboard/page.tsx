'use client';

import { useQuery } from '@apollo/client';
import withAuth from '@/app/hoc/withAuth';
import { GET_USERS } from '@/app/query/user.query';
import LogoutButton from '@/app/ui/logout-button';
import Loading from '@/app/ui/loading'
// import { CREATE_NEW_LOCATION } from '@/app/query/location.query';
import { useMutation } from '@apollo/client';
import { Button } from '@/app/ui/button';
import { ADD_LOCATION, GET_USER_LOCATIONS, DELETE_LOCATION, UPDATE_LOCATION } from '@/app/query/location.query';

interface User { 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
}

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addLocation, { loading:addLoading, error: addError, data: addData }] = useMutation(ADD_LOCATION, { variables: { address: 'Nigeria', state: 'Lagos', country: 'Nigeria', lga: 'Ikeja' } }); 
  const [deleteLocation, { loading:delLoading, error: delError, data: delData }] = useMutation(DELETE_LOCATION, { variables: { locationId: '1234' } });
  const [updateLocation, { loading:upLoading, error: upError, data: upData }] = useMutation(UPDATE_LOCATION, { variables: { locationId: '1234', address: 'Nigeria', state: 'Lagos', country: 'Nigeria', lga: 'Ikeja', longitude: '4.5433', latitude: '4.5435' } });
  const { loading:myLoading, error: myError, data: myData } = useQuery(GET_USER_LOCATIONS);

  if (delData) {
    console.log(myData && myData.getUserLocations?.locationsData[0].id);
    console.log(delData);
  }
  if (upError) {
    console.log(delError);
  }

  if (loading) {
    return (<Loading />);
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
      <Button className="w-full bg-gray-500 text-orange-900 border border-gray-200" onClick={() => addLocation(
        { variables: { address: 'Nigeria', state: 'Lagos', country: 'Nigeria', lga: 'Ikeja' } }
      )}>Add locations </Button>
      {addData && addData.ok && <p className="text-green-500 text-center">{addData.message}</p>}
      {addLoading && <p className="text-red-500 text-center">loading ...</p>}
      
      <Button className="w-full bg-gray-500 text-orange-900 border border-gray-200" onClick={() => deleteLocation(
        { variables: { locationId: myData && myData.getUserLocations?.locationsData[0].id } }
        )}>Delete locations </Button>
      {delData && delData.ok && <p className="text-green-500 text-center">{delData.message}</p>}
      {delLoading && <p className="text-red-500 text-center">loading ...</p>}
      
      <Button className="w-full bg-gray-500 text-orange-900 border border-gray-200" onClick={() => updateLocation(
        { variables: { locationId: myData && myData.getUserLocations?.locationsData[0].id, address: 'Nigeria', state: 'Ekiti', country: 'Nigeria', lga: 'Ikole', longitude:'4.5433', latitude: '7.5335' } }
      )}>Update locations </Button>
      {upData && upData.ok && <p className="text-green-500 text-center">{upData.message}</p>}
      {upLoading && <p className="text-red-500 text-center">loading ...</p>}
      {myData && myData.getUserLocations?.locationsData?.map((location: any, index: number) => (
        <div key={index} className="text-red-500 text-center">
          <p>{location.name}</p>
        </div>
      ))}

    </div>
  );
};

export default withAuth(Dashboard);
