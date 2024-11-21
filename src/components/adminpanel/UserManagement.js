import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../../api/admin";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      phone: "123-456-7890",
      username: "alice.smith",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      phone: "987-654-3210",
      username: "bob.johnson",
    },
  ]);
  
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    
  })
  
  const generateUsername = (firstName, lastName) => {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  };

  const handleAddUser = () => {
    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.phone &&
      newUser.password
    ) {
      saveProfile(newUser).then((res) => {
        const newUserId = users.length
          ? Math.max(users.map((user) => user.id)) + 1
          : 1;
        const username = generateUsername(newUser.firstName, newUser.lastName);

        setUsers([...users, { id: newUserId, username, ...newUser }]);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
        });
      }).catch(err => {
        alert("Error saving Profile")
      })
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user, password: "" });
  };

  const handleSaveEdit = () => {
    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.phone
    ) {
      const username = generateUsername(newUser.firstName, newUser.lastName);
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, username, ...newUser } : user
        )
      );
      setEditingUser(null);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-4 flex items-center text-black"
      >
        <FaArrowLeftLong className="mr-2" /> Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 p-2 rounded"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 p-2 rounded"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button
            className={`${editingUser ? "bg-yellow-500" : "bg-black"
              } text-white py-2 rounded mt-2 hover:opacity-90`}
            onClick={editingUser ? handleSaveEdit : handleAddUser}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Users</h2>
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">First Name</th>
              <th className="p-2 border border-gray-300">Last Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Phone</th>
              <th className="p-2 border border-gray-300">Username</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{user.firstName}</td>
                <td className="p-2 border border-gray-300">{user.lastName}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">{user.phone}</td>
                <td className="p-2 border border-gray-300">{user.username}</td>
                <td className="p-2 border border-gray-300 flex justify-around">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                    onClick={() => handleEditUser(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
