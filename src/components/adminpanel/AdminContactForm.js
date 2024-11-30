import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const AdminContactForm = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "kishan",
      email: "kishan@example.com",
      mobile: "1234567890",
      query: "How to exchange the product?",
    },
    {
      id: 2,
      name: "Deva",
      email: "deva@example.com",
      mobile: "9876543210",
      query: "Is there a mobile app?",
    },
    // Add more contacts as needed
  ]);

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border">
                <td className="px-6 py-4 border">{contact.name}</td>
                <td className="px-6 py-4 border">{contact.email}</td>
                <td className="px-6 py-4 border">{contact.mobile}</td>
                <td className="px-6 py-4 border">{contact.query}</td>
                <td className="px-6 py-4 text-red-500 cursor-pointer">
                  <button
                    onClick={() => handleDelete(contact.id)}
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
