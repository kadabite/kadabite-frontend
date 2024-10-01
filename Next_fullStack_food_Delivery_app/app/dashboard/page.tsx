'use client';

import { useQuery } from '@apollo/client';
import withAuth from '@/app/hoc/withAuth';
import { GET_USERS } from '@/app/query/user.query';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';

interface User { 
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: String;
}


const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS, { variables: {}});

  if (error) {
    console.log(error);
  } else console.log(data);
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
          {!loading && data && data.users.usersData.map((user: User, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{user.firstName}, {user.lastName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <CircularProgress
                    sx={{
                      color: orange[600],
                      fontSize: 30,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
      }
    </div>
  );
};

export default withAuth(Dashboard);