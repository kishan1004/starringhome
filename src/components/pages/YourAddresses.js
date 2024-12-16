import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { deleteAddress, getAddresses, addAddress } from "../../api/user";
import { useQuery } from "react-query";
import { Spin } from "antd";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import UserProtectLayout from "../common/UserProtectLayout";

const YourAddresses = () => {
  const navigate = useNavigate();
  const {
    data: getAlladdress,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["Alladdress"],
    queryFn: () => getAddresses(),
  });


  const handleAddressUpdate = async (id) => {
    navigate(`/add-address/${id}`);
  };

  const handleAddressDelete = async (id) => {
    try {
      const res = await deleteAddress({ data: { addressId: [id] } });
      if (res.status === 200) {
         refetch()
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateAddressMurtation = useMutation({
    mutationFn: addAddress,
    onSuccess: (res) => {
      refetch();
      Swal.fire("Success", "Address Added to Default", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
    },
  });

  const onUpdateDefaultAddress = (address) => {
    updateAddressMurtation.mutate({
      data: { ...address, isDefault: true },
      id: address._id,
    });
  };

  return (
    <UserProtectLayout>
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}

        <div className="md:w-1/2 p-4">
          <div className="w-full pb-4">
            <Link to="/user-account">
              <svg
                width="62"
                height="14"
                viewBox="0 0 62 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60.5 7H1M1 7L7 1M1 7L7 13"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <h1 className="text-2xl font-semibold mb-6">Your Addresses</h1>
          <div className="grid grid-cols-1 gap-6">
            {/* Add Address Card */}
            <Link to="/add-address/new">
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400">+</div>
                  <p className="mt-2 text-gray-500">Add address</p>
                </div>
              </div>
            </Link>

            {/* Existing Address Cards */}
            {isLoading ? (
              <div className="flex h-40 justify-center items-center">
                <Spin spinning={true} />
              </div>
            ) : isError ? (
              <div className="flex h-40 justify-center items-center">
                Address not found, Try after sometimes.
              </div>
            ) : (
              getAlladdress?.data?.detail.data.map((address) => (
                <div
                  key={address._id}
                  className="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full inline-block mb-2">
                      Default
                    </span>
                  )}

                  {/* Address Details */}
                  <h2 className="text-lg font-semibold">{address.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {address.address}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Phone number: {address.mobileNumber}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-4 text-sm">
                    <button
                      onClick={() => handleAddressUpdate(address._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleAddressDelete(address._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Remove
                    </button>
                    {!address.isDefault && (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                          onUpdateDefaultAddress(address);
                        }}
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center m-5 rounded-lg max-sm:hidden"
          style={{ backgroundImage: `url(${LoginImg})` }}
        ></div>
      </div>
    </section>
    </UserProtectLayout>
  );
};

export default YourAddresses;
