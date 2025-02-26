import React, { useEffect, useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { addAddress, getAddresses } from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import UserProtectLayout from "../common/UserProtectLayout";
import CountryCodes from '../../services/CountryCodes.json';
import { Country, State, City } from 'country-state-city';

const AddAddress = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [AllStates,SetStates] = useState(State.getStatesOfCountry('IN'))
  const [AllCities,SetCities] = useState(City.getCitiesOfState('IN','TN'))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "India",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      countryCode: "+91",
      postalCode: "",
      address: "",
      landmark: "",
      city: "",
      state: "Tamil Nadu",
      isDefault: false,
    },
  });

  const updateAddressMurtation = useMutation({
    mutationFn: addAddress,
    onSuccess: (res) => {
      navigate("/addresses");
      Swal.fire("Success", "Address Added", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error[0].msg, "error");
    },
  });

  function changeCountry(e){
    const countryCode = Country.getAllCountries().filter((el)=>el.name==e.target.value)[0].isoCode;
    const StatesList = State.getStatesOfCountry(countryCode)
    SetStates(StatesList)
  }

  function changeState(e){
    const stateCode = State.getAllStates().filter((el)=>el.name==e.target.value)[0];
    SetCities(City.getCitiesOfState(stateCode.countryCode,stateCode.isoCode))
  }

  useEffect(() => {
    const getAddress = async () => {
      if (id !== "new") {
        setIsUpdate(true);
        const resp = await getAddresses();
        if (resp.status === 200) {
          const filterUserAddress = resp.data.detail.data.filter(
            (address) => address._id === id
          );
          if (filterUserAddress.length === 0) {
            navigate("/addresses");
          }

          const countryCode = Country.getAllCountries().filter((el)=>el.name==filterUserAddress[0].country)[0].isoCode;
          const StatesList = State.getStatesOfCountry(countryCode)
          SetStates(StatesList)

          const stateCode = State.getAllStates().filter((el)=>el.name==filterUserAddress[0].state)[0];
          SetCities(City.getCitiesOfState(stateCode.countryCode,stateCode.isoCode))

          setValue("firstName", filterUserAddress[0].firstName);
          setValue("lastName", filterUserAddress[0].lastName);
          setValue("mobileNumber", filterUserAddress[0].mobileNumber);
          setValue("countryCode", "+91");
          setValue("email", filterUserAddress[0].email);
          setValue("postalCode", filterUserAddress[0].postalCode);
          setValue("state", filterUserAddress[0].state);
          setValue("city", filterUserAddress[0].city);
          setValue("landmark", filterUserAddress[0].landmark);
          setValue("address", filterUserAddress[0].address);
          setValue("isDefault", filterUserAddress[0].isDefault);
        }
      }
    };
    console.log(State.getStateByCode('TN'))
    getAddress();
  }, []);

  const onAddressSubmit = (value) => {
    updateAddressMurtation.mutate({ data: value, id: id });
  };

  return (
    <UserProtectLayout>
      <section className="font-beatrice bg-gray-100 min-h-screen">
        <div className="m-4 overflow-hidden md:hidden">
          <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
        </div>

        <div className="flex md:min-h-screen">
          {/* Left Side - Form Section */}

          <div className="md:w-1/2 mx-5 p-6   mt-5">
            <div className=" flex justify-between flex-wrap gap-3">
              <h1 className="text-2xl font-bold mb-6">
                {" "}
                {isUpdate ? "Update Address" : "Add a new Address"}
              </h1>
              <Button
                type="primary"
                className="bg-black"
                onClick={() => {
                  navigate("/addresses");
                }}
              >
                Back
              </Button>
            </div>

            <form onSubmit={handleSubmit(onAddressSubmit)}>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 Characters is required",
                    },
                  })}
                  placeholder="First name"
                  className="w-full border rounded p-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder=" Last name"
                  className="w-full border rounded p-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="email"
                  className="w-full border rounded p-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <select
                      name="countryCode"
                      {...register("countryCode", {
                        required: "",
                      })}
                      defaultValue="+91"
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#f3f4f6",
                        fontSize: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        width: "100px",
                      }}
                    >
                      {CountryCodes.map((code, i) => (
                        <option key={i} value={code.dial_code}>
                          {code.dial_code} ({code.name})
                        </option>
                      ))}
                    </select>


                    <input
                      type="tel"
                      name="mobileNumber"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Invalid Mobile number",
                        },
                      })}
                      placeholder="Mobile Number"
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#f3f4f6",
                        fontSize: "0.875rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        flex: 1,
                      }}
                    />
                  </div>

                  {errors.mobileNumber && (
                    <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "5px" }}>
                      {errors.mobileNumber.message}
                    </p>
                  )}
                  {errors.countryCode && (
                    <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "5px" }}>
                      {errors.countryCode.message}
                    </p>
                  )}
                </div>
                {/* <input
                type="text"
                name="mobileNumber"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid Mobile number",
                  },
                })}
                placeholder="Enter mobile number"
                className="w-full border rounded p-2"
              /> */}
                {/* {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )} */}
              </div>

              {/* Pincode */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  name="postalCode"
                  {...register("postalCode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[1-9][0-9]{5}$/,
                      message: "Invalid pincode",
                    },
                  })}
                  placeholder="6 digits [0-9] PIN code"
                  className="w-full border rounded p-2"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              {/* Address Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Flat, House no., Building, Company, Apartment"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 Characters is required",
                    },
                  })}
                  className="w-full border rounded p-2"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              {/* Landmark */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  {...register("landmark", { required: "Landmark is required" })}
                  placeholder="e.g., near Apollo Hospital"
                  className="w-full border rounded p-2"
                />
                {errors.landmark && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.landmark.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  name="country"
                  {...register("country", { required: "Country is required" })}
                  className="w-full border rounded p-2"
                  onChange={(e)=>changeCountry(e)}
                >
                  {Country.getAllCountries().map((country, i) => (
                    <option value={country.name} key={i}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Town/City and State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Town/City
                  </label>
                  <select
                    name="city"
                    {...register("city", {
                      required: "City is required",
                    })}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Choose a city</option>
                    {AllCities.map((city,i)=>(
                      <option value={city.name}>{city.name}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <select
                    name="state"
                    {...register("state", {
                      required: "State is required",
                    })}
                    className="w-full border rounded p-2"
                    onChange={(e)=>changeState(e)}
                  >
                    <option value="">Choose a state</option>
                    {AllStates.map((state, i) => (
                      <option value={state.name}>{state.name}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Default Address */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    {...register("isDefault")}
                    className="mr-2"
                  />
                  Make this my default address
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={updateAddressMurtation.isLoading}
                  size="large"
                  className="w-full bg-black text-white py-2 rounded"
                >
                  {isUpdate ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </form>
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

export default AddAddress;
