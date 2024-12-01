import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { getContactUs, deleteContactUs } from "../../api/admin";

const AdminContactForm = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchContactUs = async () => {
    setLoading(true);
    const res = await getContactUs(page, limit);
    if (res.status === 200) {
      console.log(res.data.detail.data);
      setContacts(res.data.detail.data);
      setLoading(false);
      setError(false);
    } else {
      setError(true);
      console.log(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContactUs();
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteContactUs(id);
    if (res.status === 200) {
      console.log(res);
      fetchContactUs();
    } else {
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-[60px]">
      <h1 className="text-3xl font-bold mb-6">User Queries</h1>

      <div className="overflow-x-auto bg-white shadow-lg">
        <table className="min-w-full bg-white border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email ID
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3">
                Query
              </th>
              <th scope="col" className="px-6 py-3">
                Created Time
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr className="border">
                <td className="px-6 py-4 border">Something went wrong</td>
              </tr>
            )}
            {loading && (
              <tr className="border">
                <td className="px-6 py-4 border">Loading...</td>
              </tr>
            )}
            {!loading &&
              !error &&
              contacts.map((contact) => (
                <tr key={contact._id} className="border">
                  <td className="px-6 py-4 border">{contact.name}</td>
                  <td className="px-6 py-4 border">{contact.email}</td>
                  <td className="px-6 py-4 border">{contact.mobileNumber}</td>
                  <td className="px-6 py-4 border">{contact.passage}</td>
                  <td className="px-6 py-4 border">
                    {new Date(contact.createdTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-red-500 cursor-pointer">
                    <button
                      onClick={() => {
                        handleDelete(contact._id);
                      }}
                      className="text-red-600 hover:text-red-800 flex "
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

export default AdminContactForm;
