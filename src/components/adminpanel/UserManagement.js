import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteProfile, getProfiles, saveProfile } from "../../api/admin";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import MetaTags from "../common/MetaTags";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .max(15, "First Name cannot exceed 15 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .max(15, "Last Name cannot exceed 15 characters")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^\+91\d{10}$/, "Mobile Number must start with +91 and be 10 digits")
      .required("Mobile Number is required"),
    password: Yup.string()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$:;".<~>!%`^\[\]\-'\\\({|_+=/,})*#?&]).{8,15}$/,
        "Password must be 8-15 characters with at least one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userPayload = {
        ...values,
        username: generateUsername(values.firstName, values.lastName),
      };

      if (editingUser) {
        // Edit existing user
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...userPayload } : user
          )
        );
        setEditingUser(null);
        Swal.fire("Success", "User updated successfully!", "success");
        formik.resetForm(); // Reset form after successful update
      } else {
        // Add new user
        saveProfile(userPayload)
          .then((res) => {
            if (res.status === 201) {
              const newUserId = users.length
                ? Math.max(...users.map((user) => user.id)) + 1
                : 1;
              setUsers([...users, { id: newUserId, ...userPayload }]);
              Swal.fire("Success", "User added successfully!", "success");
              formik.resetForm(); // Reset form only for success
            } else {
              const valiErr = res.response.data.detail[0].msg;
              Swal.fire("Failed", valiErr, "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Error saving user. Please try again.", "error");
          });
      }
    }
  });

  const handleEditUser = (user) => {
    setEditingUser(user);
    formik.setValues(user);
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProfile(id).then(() => {
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        });
      }
    });
  };

  const metaData = {
    title: "User Management", desc: ""
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <MetaTags data={metaData} />

      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-4 flex items-center text-black"
      >
        <FaArrowLeftLong className="mr-2" /> Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={formik.handleSubmit} className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
        <div className="flex flex-col gap-2">
          {["firstName", "lastName", "email", "mobileNumber"].map(
            (field) => (
              <div key={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  className={`w-full border ${formik.touched[field] && formik.errors[field]
                    ? "border-red-500"
                    : "border-gray-300"
                    } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...formik.getFieldProps(field)}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <span className="text-red-500 text-sm">
                    {formik.errors[field]}
                  </span>
                )}

              </div>

            )
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full border ${formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
                } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...formik.getFieldProps("password")}
            />
            <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-sm">
                {formik.errors.password}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${editingUser ? "bg-yellow-500" : "bg-black"
              } text-white py-2 w-36 rounded mt-2 hover:opacity-90`}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>

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
