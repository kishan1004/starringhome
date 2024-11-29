import React, { useEffect, useState } from "react";
import LoginImg from "../../images/loginimage.jpeg";
import LoginImgsm from "../../images/loginimagesmall.jpeg";
import { addAddress, getAddresses } from "../../api/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    country: "India",
    firstName: "",
    lastName:"",
    mobile: "",
    pincode: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    isDefault: false,
  });
  const [email, setEmail] = useState("");
  const [isUpdate,setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(()=>{
    const token = localStorage.getItem('userToken');
    const getAddress=async()=>{
      const user = jwtDecode(token);
      console.log("email",user.userName);
      if(id!=='new')
      {
        setIsUpdate(true);
        const resp = await getAddresses();
        if(resp.status===200)
        {
          const address = resp.data.detail.data.find(address => address._id === id);
          const arr = address.address.split(' ');
          setFormData({
            firstName:address.firstName,
            lastName:address.lastName,
            email:token.userName,
            pincode:address.postalCode,
            state:address.state,
            landmark:address.landmark,
            city:address.city,
            mobile:address.mobileNumber,
            flat:arr[0],
            area:arr[1]
          })
        }
      }
      console.log(id,user.userName);
      setEmail(user.userName);
    }
  getAddress();
  },[])

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
    try{
      const address = formData.flat+" "+formData.area;
      const res = await addAddress(formData.firstName,
        formData.lastName,
        email,
        formData.mobile,
        formData.country,
        formData.state,
        address,
        formData.city,
        formData.landmark,
        formData.pincode,
        formData.isDefault,
        id)
        if(res.status===200)
        {
          console.log(res.data);
          setFormData({
            country: "India",
            firstName: "",
            lastName: "",
            mobile: "",
            pincode: "",
            flat: "",
            area: "",
            landmark: "",
            city: "",
            state: "",
            isDefault: false,
            id
          });
        }
        navigate('/addresses')
    }catch (err) {
      console.error("Error submitting form: ", err); 
    }
  };

  return (
    <section className="font-beatrice bg-gray-100 min-h-screen">
      <div className="m-4 overflow-hidden md:hidden">
        <img src={LoginImgsm} alt="logo" className="rounded-lg object-cover" />
      </div>

      <div className="flex md:min-h-screen">
        {/* Left Side - Form Section */}

        <div className="md:w-1/2 mx-5 p-6   mt-5">
          <h1 className="text-2xl font-bold mb-6"> {isUpdate?("Update Address"):("Add a new Address")}</h1>

          <form onSubmit={handleFormSubmit}>
            {/* Country/Region */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Country/Region
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full border rounded p-2"
              />
              </div>
                <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder=" Last name"
                className="w-full border rounded p-2"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className="w-full border rounded p-2"
              />
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="6 digits [0-9] PIN code"
                className="w-full border rounded p-2"
              />
            </div>

            {/* Address Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Flat, House no., Building, Company, Apartment
              </label>
              <input
                type="text"
                name="flat"
                value={formData.flat}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Area, Street, Sector, Village
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Landmark */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="e.g., near Apollo Hospital"
                className="w-full border rounded p-2"
              />
            </div>

            {/* Town/City and State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Town/City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Choose a state</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
            </div>

            {/* Default Address */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Make this my default address
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded"
              >
              {isUpdate?("Update Address"):("Add Address")}
                
              </button>
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
  );
};

export default AddAddress;
