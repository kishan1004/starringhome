import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteProfile, getProfiles, saveProfile } from "../../api/admin";
import Swal from "sweetalert2";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getProfiles(1, 50).then((res) => {
      const data = res?.data?.detail?.data;
      if (data) {
        setUsers(data);
      }
    });
  }, []);

  const generateUsername = (firstName, lastName) => {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  };

  const validateFields = () => {
    const newErrors = {};

    if (!newUser.firstName) newErrors.firstName = "First Name is required.";
    if (!newUser.lastName) newErrors.lastName = "Last Name is required.";
    if (!newUser.email) newErrors.email = "Email is required.";
    if (!newUser.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required.";
    if (!newUser.password && !editingUser)
      newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    if (!validateFields()) return;

    saveProfile(newUser)
      .then(() => {
        const newUserId = users.length
          ? Math.max(...users.map((user) => user.id)) + 1
          : 1;
        const username = generateUsername(newUser.firstName, newUser.lastName);

        setUsers([...users, { id: newUserId, username, ...newUser }]);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          password: "",
        });
        setErrors({});

        Swal.fire({
          icon: "success",
          title: "Profile Saved",
          text: "Profile saved successfully!",
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error saving profile. Please try again.",
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user, password: "" });
  };

  const handleSaveEdit = () => {
    if (!validateFields()) return;

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
      mobileNumber: "",
      password: "",
    });

    Swal.fire({
      icon: "success",
      title: "Changes Saved",
      text: "User details updated successfully!",
      timer: 5000,
      timerProgressBar: true,
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProfile(id).then(() => {
          setUsers(users.filter((user) => user.id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "User has been deleted.",
            timer: 5000,
            timerProgressBar: true,
          });
        });
      }
    });
  };

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
          {["firstName", "lastName", "email", "mobileNumber", "password"].map(
            (field) => (
              <div key={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  className={`w-full border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newUser[field]}
                  onChange={(e) =>
                    setNewUser({ ...newUser, [field]: e.target.value })
                  }
                />
                {errors[field] && (
                  <span className="text-red-500 text-sm">{errors[field]}</span>
                )}
              </div>
            )
          )}
          <button
            className={`${
              editingUser ? "bg-yellow-500" : "bg-black"
            } text-white py-2 w-36 rounded mt-2 hover:opacity-90`}
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
              <th className="p-2 border border-gray-300">Mobile</th>
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
                <td className="p-2 border border-gray-300">
                  {user.mobileNumber}
                </td>
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
