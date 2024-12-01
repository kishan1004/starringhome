            import React, { useEffect, useState } from "react";
            import Product1 from "../../images/product1.jpeg";
            import Product2 from "../../images/product2.jpeg";
            import { Link } from "react-router-dom";
            import { RiArrowDropDownLine } from "react-icons/ri";
            import { buyProducts, getAddresses, getCartDetails, getCartProducts, getProductById } from "../../api/user";

            // Saved Address Component
            const SavedAddress = ({ savedAddress }) => {
              const [isAddressVisible, setIsAddressVisible] = useState(false);

              const toggleAddressVisibility = () => {
                setIsAddressVisible((prevState) => !prevState);
              };

              return (
                <div className="space-y-6 pb-4">
                  <h3
                    className="text-sm font-semibold cursor-pointer flex items-center"
                    onClick={toggleAddressVisibility}
                  >
                    SAVED ADDRESS <RiArrowDropDownLine />
                  </h3>
                  {isAddressVisible && (
                    <div className="space-y-4">
                      <div className="p-3 border border-gray-300 bg-gray-50">
                        <p className="text-sm font-medium">
                          {savedAddress.firstName} {savedAddress.lastName}
                        </p>
                        <p className="text-sm">{savedAddress.address}</p>
                        <p className="text-sm">
                          {savedAddress.city}, {savedAddress.state}{" "}
                          {savedAddress.postalCode}
                        </p>
                        <p className="text-sm">{savedAddress.country}</p>
                        <p className="text-sm">{savedAddress.phone}</p>
                        <p className="text-sm">{savedAddress.email}</p>
                        <button className="text-sm text-blue-500 mt-2">
                          Use this address
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            };

            const CheckoutPage = () => {
              const [orders, setOrders] = useState([]);
              const [cartProducts, setCartProducts] = useState([]);
              const [total,setTotal] = useState(0);
              const [addressDetails, setAddressDetails] = useState({
                firstName: '',
                lastName: '',
                country: 'India',
                state: '',
                address: '',
                city: '',
                postalCode: '',
                landmark: '',
                email: '',
                mobileNumber: '',
              });
              const [products,setProducts] = useState([
                {
                  productId: '',
                  name: '',
                  size: '',
                  count: '',
                }
              ]);
              

              useEffect(() => {
                const fetchCartDetails = async () => {
                  const response = await getCartDetails(1, 100);
                  const {data} = response.data.detail;
                  setOrders(data);
                  setProducts(data.map(product => ({
                    productId: product._id,
                    name: product.name,
                    size: '',
                    count: 1
                  })));
                  console.log("get cart details", data);
                };
                fetchCartDetails();
              }, []);

              useEffect(() => {
                const productIds = orders.map((product) => product._id);
                let t = 0;
                const fetchProductDetails = async () => {
                  const productDetails = await Promise.all(
                    productIds.map(async (id) => {
                      const response = await getProductById(id);
                      return response.data.detail;
                    })
                  );
                  console.log("all products", productDetails);
                  t = productDetails.reduce((acc, product) => acc + product.price, 0);
                  setTotal(t);
                  setCartProducts(productDetails);
                };
                
                fetchProductDetails();

                console.log(orders);
              }, [orders]);

              useEffect(() => {
                // Assuming you have a function to fetch saved address
                const fetchSavedAddress = async () => {
                  const response = await getAddresses(); // Replace with actual API call
                  const { firstName, lastName, country, state, address, city, postalCode } = response.data;
                  setAddressDetails({ firstName, lastName, country, state, address, city, postalCode });
                };

                fetchSavedAddress();
              }, []);
              const subtotal = cartProducts.reduce(
                (acc, product) => acc + product.price * product.stockCount[0].count,
                0
              );

              const totalCount = cartProducts.reduce(
                (acc, product) => acc + product.stockCount[0].count,
                0
              );


              const [orderData, setOrderData] = useState({
                products: cartProducts.map(product => ({
                  productId: product._id,
                  name: product.name,
                  size: product.sizes[0].size,
                  count: 1,
                })), // Assuming you have a way to get this
                addressDetails: {
                  firstName: addressDetails.firstName,
                  lastName: addressDetails.lastName,
                  email: '', // Add email if available
                  mobileNumber: '', // Add mobile number if available
                  country: "India",
                  state: addressDetails.state,
                  address: addressDetails.address,
                  city: addressDetails.city,

                  landmark: '', // Add landmark if available
                  postalCode: addressDetails.postalCode,
                },
                amount: total,
                couponId: '', // Assuming you have a way to get this
                shipping: total >3000?0:100, // Assuming a fixed shipping cost
                total: total + (total >3000?0:100), // Calculate total
              });

              const handleIncrease = (productIndex) => {
                setTotal(total + cartProducts[productIndex].price);
                setProducts((prevProducts) => {
                  const updatedProducts = [...prevProducts];
                  updatedProducts[productIndex].count = Number((updatedProducts[productIndex].count || 0) + 1);
                  
                  return updatedProducts;
                });
              };

              const handleDecrease = (productIndex) => {
                setTotal(total - cartProducts[productIndex].price);
                setProducts((prevProducts) => {
                  const updatedProducts = [...prevProducts];
                  if (updatedProducts[productIndex].count > 0) {
                    updatedProducts[productIndex].count = Number(updatedProducts[productIndex].count - 1);
                  }
                  return updatedProducts;
                });
              };

              const handleDelete = (productIndex) => {
                setCartProducts((prevProducts) => {
                  return prevProducts.filter((_, i) => i !== productIndex);
                });
              };

              const handleAddressChange = (e) => {
                const { name, value } = e.target;
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  [name]: value,
                }));
              };

              const handleShippingClick = async () => {
                try {
                  console.log("address details", addressDetails);
                  addressDetails.country= "India";
                  setOrderData((prevOrderData) => ({
                    ...prevOrderData,
                    addressDetails: {
                      ...addressDetails,
                    },
                  }));

                  setOrderData((prevOrderData) => ({
                    ...prevOrderData,
                    products: products,
                  }));
                  
                  // console.log("Products", products);

                    // Log the updated orderData after setting it
                  // setTimeout(() => console.log("order data", orderData), 0);
                  const res = await buyProducts(orderData);
                   console.log("res", res);
                  // const response = await axios.post('/api/checkout', orderData); // Replace with your actual API endpoint
                  // console.log('Order posted successfully:', response.data);
                  // Handle success (e.g., navigate to a confirmation page)
                } catch (error) {
                  console.error('Error posting order:', error);
                  // Handle error (e.g., show an error message)
                }
              };

              const handleSizeChange = (productIndex, size) => {
                setProducts((prevProducts) => {
                  const updatedProducts = [...prevProducts];
                  updatedProducts[productIndex].size = size;
                  return updatedProducts;
                });
              };

              return (
                // <div>Checking.....</div>
                <section className=" w-full bg-gray-100 min-h-screen">
                  <div className=" md:px-10 md:py-14 px-4 py-10">
                    <Link to="/one-product">
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

                  <div className="md:px-10 px-3">
                    <h1 className="font-beatrice font-extrabold text-4xl pb-7">CHECKOUT</h1>
                    <div className="flex md:space-x-8 space-x-4">
                      <h3 className="font-medium text-base">INFORMATION</h3>
                      <h3 className="font-normal text-base text-[#8A8A8A]">SHIPPING</h3>
                      <h3 className="font-normal text-base text-[#8A8A8A]">PAYMENT</h3>
                    </div>
                  </div>

                  <div className="md:flex">
                    <div className="md:p-10 md:w-1/2 p-4 pb-10">
                      <SavedAddress savedAddress={addressDetails} />

                      <h3 className="text-sm font-semibold pt-4 pb-2">SHIPPING ADDRESS</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            value={addressDetails.firstName}
                            onChange={handleAddressChange}
                            placeholder="First Name"
                            className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                          />
                          <input
                            type="text"
                            name="lastName"
                            value={addressDetails.lastName}
                            onChange={handleAddressChange}
                            placeholder="Last Name"
                            className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                          />
                        </div>
                        <input
        type="email"
        name="email"
        value={addressDetails.email}
        onChange={handleAddressChange}
        placeholder="Email"
        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
      />
      <input
        type="tel"
        name="mobileNumber"
        value={addressDetails.mobileNumber}
        onChange={handleAddressChange}
        placeholder="Mobile Number"
        className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
      />
                        <input
                          type="text"
                          name="state"
                          value={addressDetails.state}
                          onChange={handleAddressChange}
                          placeholder="State / Region"
                          className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                        />
                        <input
                          type="text"
                          name="address"
                          value={addressDetails.address}
                          onChange={handleAddressChange}
                          placeholder="Address"
                          className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="city"
                            value={addressDetails.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                          />
                           <input
                            type="text"
                            name="landmark"
                            value={addressDetails.landmark}
                            onChange={handleAddressChange}
                            placeholder="Landmark"
                            className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                          />
                          <input
                            type="text"
                            name="postalCode"
                            value={addressDetails.postalCode}
                            onChange={handleAddressChange}
                            placeholder="Postal Code"
                            className="w-full p-3 bg-gray-100 text-sm border border-gray-300"
                          />
                        </div>
                      </div>

                      <button onClick={handleShippingClick} className="w-full bg-blue-500 text-white py-3 font-semibold text-base font-beatrice mt-4">Continue</button>
                      {/* <Link to="/payment-confirmation"> */}
                        <div className="md:grid grid-cols-1 justify-items-end gap-4 hidden">
                          <button
                            className="w-1/2 flex justify-between bg-[#D9D9D9] hover:bg-gray-500 py-3 lg:px-5 px-2 items-center font-semibold text-base font-beatrice mt-4"
                            
                          >
                            Shipping
                            <svg
                              width="50"
                              height="14"
                              viewBox="0 0 50 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7H48.5M48.5 7L42.5 1M48.5 7L42.5 13"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      {/* </Link> */}
                    </div>

                    <div className="p-4 md:pr-10 lg:mx-20 mt-10 font-beatrice">
                      <div className="px-4 py-10 border-2 md:px-6 relative">
                        <div className="absolute bg-white text-[#000E8A] top-0 right-0 h-10 w-10 flex items-center justify-center">
                          <p>({totalCount})</p>
                        </div>
                        <h3 className="text-base font-medium">YOUR ORDER</h3>
                        <div className="space-y-6 mt-6">
                          {cartProducts.map((product, productIndex) => (
                            <div key={productIndex} className="flex items-center">
                              <Link to="/one-product">
                                <img
                                  src={product.photos[0]}
                                  alt={product.name}
                                  className="w-28 h-36 object-cover border-2"
                                />
                              </Link>
                              <div className="grid grid-cols-2 md:gap-10 gap-5 place-content-between ml-4">
                                <div className="flex flex-col">
                                  <Link to="/one-product">
                                    <p className="font-medium text-base xl:w-52">
                                      {product.name}
                                    </p>
                                  </Link>
                                  <div className="flex space-x-2">
                                    {product.sizes.map((size, sizeIndex) => (
                                      <button
                                        key={sizeIndex}
                                        className={`px-2 py-1 border ${products[productIndex]?.size === size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => handleSizeChange(productIndex, size)}
                                      >
                                        {size}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <button
                                    className="text-red-500 text-lg"
                                    onClick={() => handleDelete(productIndex)}
                                  >
                                    X
                                  </button>
                                </div>

                                <div className="text-[#000E8A]">
                                  <div className="text-[#000E8A] flex items-center space-x-2">
                                    <button
                                      className="px-2 py-1 bg-gray-200"
                                      onClick={() => handleDecrease(productIndex)}
                                    >
                                      -
                                    </button>
                                    <p>{products[productIndex]?.count || 0}</p>
                                    <button
                                      className="px-2 py-1 bg-gray-200"
                                      onClick={() => handleIncrease(productIndex)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <p className="font-medium">Rs.{product.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t-2 mt-6 pt-4">
                          <div className="flex justify-between">
                            <p className="font-medium">Subtotal</p>
                            <p className="font-medium text-base">
                              {total}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Shipping</p>
                            <p className="font-medium text-xs text-[#8A8A8A]">
                              Calculated at next step
                            </p>
                          </div>
                          <div className="flex justify-between mt-6 border-t-2 pt-4">
                            <p className="text-base font-medium">Total</p>
                            <p className="text-base font-medium">
                              Rs.{total}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <Link to="/payment-confirmation"> */}
                        <div className="grid grid-cols-1 justify-items-end gap-4 md:hidden pb-20">
                          <button className="w-1/2 flex justify-between bg-[#D9D9D9] hover:bg-gray-600 py-3 lg:px-5 px-2 items-center font-semibold text-base font-beatrice mt-4"
                        >
                            Shipping
                            <svg
                              width="50"
                              height="14"
                              viewBox="0 0 50 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7H48.5M48.5 7L42.5 1M48.5 7L42.5 13"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                 
                        </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </section>
              );
            };

            export default CheckoutPage;
