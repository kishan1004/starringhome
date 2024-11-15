import React, { useState } from "react";
import Product1 from "../../images/product1.jpeg";
import Product2 from "../../images/product2.jpeg";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);

  const productPrice = 99;
  const shipping = 10;

  const increaseQuantity1 = () => setQuantity1(quantity1 + 1);
  const decreaseQuantity1 = () => quantity1 > 1 && setQuantity1(quantity1 - 1);

  const increaseQuantity2 = () => setQuantity2(quantity2 + 1);
  const decreaseQuantity2 = () => quantity2 > 1 && setQuantity2(quantity2 - 1);

  const subtotal = quantity1 * productPrice + quantity2 * productPrice;
  const total = subtotal + shipping;

  return (
    <section className="bg-gray-100 font-beatrice">
      <div className="w-screen md:px-10  px-4">
        <Link to="/all-products">
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
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className=" md:p-10 p-2 pb-20 min-h-screen flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex space-x-8">
            <h1 className="text-sm font-medium m-4 font-sans">SHOPPING BAG</h1>
            <Link to="/Favourites">
              <div className="flex space-x-1">
                <button>
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.66">
                      <rect
                        width="34"
                        height="34"
                        fill="white"
                        fill-opacity="0.88"
                      />
                      <path
                        d="M19.2792 20.4917L19.2577 20.1424L19.2792 20.4917ZM16.1681 14.8814L16.1417 15.2304C16.2366 15.2376 16.3303 15.2058 16.4013 15.1425C16.4722 15.0791 16.5143 14.9895 16.5178 14.8944L16.1681 14.8814ZM21.3934 18.603L21.7382 18.6636L21.3934 18.603ZM19.2577 20.1424C18.3589 20.1978 17.4196 20.3069 16.502 20.2005C15.6023 20.0961 14.763 19.7863 14.08 19.0218L13.558 19.4881C14.3865 20.4156 15.405 20.7779 16.4213 20.8958C17.4197 21.0117 18.4548 20.8932 19.3007 20.8411L19.2577 20.1424ZM14.08 19.0218C13.4115 18.2734 13.2737 17.2681 13.6152 16.4886C13.947 15.7314 14.7611 15.1262 16.1417 15.2304L16.1944 14.5324C14.5562 14.4087 13.44 15.1442 12.9741 16.2077C12.5179 17.249 12.715 18.5445 13.558 19.4881L14.08 19.0218ZM19.3007 20.8411C19.6045 20.8224 19.9296 20.8013 20.2248 20.7414C20.5197 20.6815 20.8232 20.5759 21.0634 20.3613L20.5971 19.8393C20.4894 19.9355 20.3251 20.0067 20.0855 20.0553C19.846 20.104 19.5696 20.1232 19.2577 20.1424L19.3007 20.8411ZM21.7382 18.6636C21.885 17.8289 22.1189 16.8137 22.116 15.8086C22.113 14.7854 21.8673 13.7327 21.0388 12.8053L20.5168 13.2716C21.1997 14.0362 21.4133 14.905 21.416 15.8107C21.4187 16.7344 21.2047 17.6555 21.0487 18.5424L21.7382 18.6636ZM21.0388 12.8053C20.1958 11.8616 18.9307 11.5203 17.8447 11.8566C16.7356 12.2002 15.8794 13.2267 15.8183 14.8684L16.5178 14.8944C16.5693 13.5109 17.2621 12.7699 18.0519 12.5253C18.8648 12.2735 19.8482 12.5233 20.5168 13.2716L21.0388 12.8053ZM21.0487 18.5424C20.9946 18.8502 20.9445 19.1226 20.8693 19.3552C20.794 19.5878 20.7048 19.7431 20.5971 19.8393L21.0634 20.3613C21.3037 20.1467 21.4426 19.857 21.5353 19.5706C21.628 19.2841 21.6854 18.9633 21.7382 18.6636L21.0487 18.5424Z"
                        fill="#1E1E1E"
                      />
                    </g>
                  </svg>
                </button>
                <h1 className="text-sm font-medium text-[#8A8A8A] m-4 font-sans">
                  FAVOURITES
                </h1>
              </div>
            </Link>
          </div>

          <div className="border-t border-dotted border-gray-500 lg:w-2/3 my-6"></div>

          <div className="lg:flex justify-between">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 place-content-center">
              <div className="flex items-center p-4 mb-4">
                <div className="w-full">
                  <div className="relative">
                    <div className="absolute bottom-0 right-0">
                      <a href="/">
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.66">
                            <rect
                              width="34"
                              height="34"
                              fill="white"
                              fill-opacity="0.88"
                            />
                            <path
                              d="M19.2792 20.4917L19.2577 20.1424L19.2792 20.4917ZM16.1681 14.8814L16.1417 15.2304C16.2366 15.2376 16.3303 15.2058 16.4013 15.1425C16.4722 15.0791 16.5143 14.9895 16.5178 14.8944L16.1681 14.8814ZM21.3934 18.603L21.7382 18.6636L21.3934 18.603ZM19.2577 20.1424C18.3589 20.1978 17.4196 20.3069 16.502 20.2005C15.6023 20.0961 14.763 19.7863 14.08 19.0218L13.558 19.4881C14.3865 20.4156 15.405 20.7779 16.4213 20.8958C17.4197 21.0117 18.4548 20.8932 19.3007 20.8411L19.2577 20.1424ZM14.08 19.0218C13.4115 18.2734 13.2737 17.2681 13.6152 16.4886C13.947 15.7314 14.7611 15.1262 16.1417 15.2304L16.1944 14.5324C14.5562 14.4087 13.44 15.1442 12.9741 16.2077C12.5179 17.249 12.715 18.5445 13.558 19.4881L14.08 19.0218ZM19.3007 20.8411C19.6045 20.8224 19.9296 20.8013 20.2248 20.7414C20.5197 20.6815 20.8232 20.5759 21.0634 20.3613L20.5971 19.8393C20.4894 19.9355 20.3251 20.0067 20.0855 20.0553C19.846 20.104 19.5696 20.1232 19.2577 20.1424L19.3007 20.8411ZM21.7382 18.6636C21.885 17.8289 22.1189 16.8137 22.116 15.8086C22.113 14.7854 21.8673 13.7327 21.0388 12.8053L20.5168 13.2716C21.1997 14.0362 21.4133 14.905 21.416 15.8107C21.4187 16.7344 21.2047 17.6555 21.0487 18.5424L21.7382 18.6636ZM21.0388 12.8053C20.1958 11.8616 18.9307 11.5203 17.8447 11.8566C16.7356 12.2002 15.8794 13.2267 15.8183 14.8684L16.5178 14.8944C16.5693 13.5109 17.2621 12.7699 18.0519 12.5253C18.8648 12.2735 19.8482 12.5233 20.5168 13.2716L21.0388 12.8053ZM21.0487 18.5424C20.9946 18.8502 20.9445 19.1226 20.8693 19.3552C20.794 19.5878 20.7048 19.7431 20.5971 19.8393L21.0634 20.3613C21.3037 20.1467 21.4426 19.857 21.5353 19.5706C21.628 19.2841 21.6854 18.9633 21.7382 18.6636L21.0487 18.5424Z"
                              fill="#1E1E1E"
                            />
                          </g>
                        </svg>
                      </a>
                    </div>
                    <img
                      src={Product1}
                      alt="Product 1"
                      className="w-full object-cover h-[270px] border-2"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xs font-medium">Cotton T Shirt</h2>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm">Full Sleeve Zipper</p>
                      <p className="text-sm">$ {productPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mx-2">
                  <button className="mb-14">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1.00004L1 11M0.999958 1L10.9999 11"
                        stroke="#5E5E5E"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center space-y-3">
                    <h1>L</h1>
                    <div className="h-7 w-7 bg-black"></div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={increaseQuantity1}
                        className="h-6 w-6 bg-gray-300"
                      >
                        +
                      </button>
                      <span className="h-6 w-6 bg-white flex items-center justify-center">
                        {quantity1}
                      </span>
                      <button
                        onClick={decreaseQuantity1}
                        className="h-6 w-6 bg-gray-300"
                      >
                        -
                      </button>
                    </div>
                    <button>
                      <svg
                        width="19"
                        height="16"
                        viewBox="0 0 19 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.95155 7.55864H2.20155V7.55864L2.95155 7.55864ZM2.95155 8.87037L2.39007 9.3676C2.52536 9.52037 2.71705 9.61142 2.92094 9.61975C3.12483 9.62807 3.32331 9.55296 3.4706 9.41174L2.95155 8.87037ZM5.76905 7.20804C6.06805 6.92137 6.07804 6.4466 5.79137 6.14761C5.50471 5.84862 5.02994 5.83863 4.73095 6.1253L5.76905 7.20804ZM1.56148 6.16943C1.28686 5.85934 0.812863 5.83057 0.502767 6.10519C0.19267 6.3798 0.163906 6.8538 0.438521 7.1639L1.56148 6.16943ZM13.8826 3.6343C14.1639 3.93837 14.6384 3.95683 14.9425 3.67555C15.2465 3.39427 15.265 2.91976 14.9837 2.6157L13.8826 3.6343ZM9.56192 0.25C5.50246 0.25 2.20155 3.51665 2.20155 7.55864H3.70155C3.70155 4.35616 6.31976 1.75 9.56192 1.75V0.25ZM2.20155 7.55864L2.20155 8.87037L3.70155 8.87037L3.70155 7.55864L2.20155 7.55864ZM3.4706 9.41174L5.76905 7.20804L4.73095 6.1253L2.4325 8.329L3.4706 9.41174ZM3.51303 8.37314L1.56148 6.16943L0.438521 7.1639L2.39007 9.3676L3.51303 8.37314ZM14.9837 2.6157C13.6387 1.16173 11.7064 0.25 9.56192 0.25V1.75C11.2731 1.75 12.811 2.47586 13.8826 3.6343L14.9837 2.6157Z"
                          fill="#8A8A8A"
                        />
                        <path
                          d="M16.0436 7.29688L16.6043 6.79875C16.4688 6.64627 16.2771 6.55554 16.0733 6.54746C15.8695 6.53939 15.6712 6.61466 15.5241 6.75594L16.0436 7.29688ZM13.2308 8.95842C12.9321 9.24534 12.9225 9.72012 13.2094 10.0189C13.4963 10.3176 13.9711 10.3272 14.2698 10.0403L13.2308 8.95842ZM17.4396 9.99748C17.7147 10.3071 18.1888 10.3351 18.4985 10.06C18.8081 9.78493 18.8361 9.31088 18.561 9.00122L17.4396 9.99748ZM5.08887 12.5546C4.80541 12.2526 4.33078 12.2375 4.02875 12.521C3.72671 12.8044 3.71165 13.2791 3.99511 13.5811L5.08887 12.5546ZM9.40795 15.9172C13.4787 15.9172 16.7936 12.6533 16.7936 8.6086H15.2936C15.2936 11.8084 12.6668 14.4172 9.40795 14.4172V15.9172ZM16.7936 8.6086V7.29688H15.2936V8.6086H16.7936ZM15.5241 6.75594L13.2308 8.95842L14.2698 10.0403L16.5631 7.83781L15.5241 6.75594ZM15.4829 7.795L17.4396 9.99748L18.561 9.00122L16.6043 6.79875L15.4829 7.795ZM3.99511 13.5811C5.34385 15.0182 7.2712 15.9172 9.40795 15.9172V14.4172C7.69966 14.4172 6.16389 13.7001 5.08887 12.5546L3.99511 13.5811Z"
                          fill="#8A8A8A"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 mb-4">
                <div className="w-full">
                  <div className="relative">
                    <div className="absolute bottom-0 right-0">
                      <a href="/">
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.66">
                            <rect
                              width="34"
                              height="34"
                              fill="white"
                              fill-opacity="0.88"
                            />
                            <path
                              d="M19.2792 20.4917L19.2577 20.1424L19.2792 20.4917ZM16.1681 14.8814L16.1417 15.2304C16.2366 15.2376 16.3303 15.2058 16.4013 15.1425C16.4722 15.0791 16.5143 14.9895 16.5178 14.8944L16.1681 14.8814ZM21.3934 18.603L21.7382 18.6636L21.3934 18.603ZM19.2577 20.1424C18.3589 20.1978 17.4196 20.3069 16.502 20.2005C15.6023 20.0961 14.763 19.7863 14.08 19.0218L13.558 19.4881C14.3865 20.4156 15.405 20.7779 16.4213 20.8958C17.4197 21.0117 18.4548 20.8932 19.3007 20.8411L19.2577 20.1424ZM14.08 19.0218C13.4115 18.2734 13.2737 17.2681 13.6152 16.4886C13.947 15.7314 14.7611 15.1262 16.1417 15.2304L16.1944 14.5324C14.5562 14.4087 13.44 15.1442 12.9741 16.2077C12.5179 17.249 12.715 18.5445 13.558 19.4881L14.08 19.0218ZM19.3007 20.8411C19.6045 20.8224 19.9296 20.8013 20.2248 20.7414C20.5197 20.6815 20.8232 20.5759 21.0634 20.3613L20.5971 19.8393C20.4894 19.9355 20.3251 20.0067 20.0855 20.0553C19.846 20.104 19.5696 20.1232 19.2577 20.1424L19.3007 20.8411ZM21.7382 18.6636C21.885 17.8289 22.1189 16.8137 22.116 15.8086C22.113 14.7854 21.8673 13.7327 21.0388 12.8053L20.5168 13.2716C21.1997 14.0362 21.4133 14.905 21.416 15.8107C21.4187 16.7344 21.2047 17.6555 21.0487 18.5424L21.7382 18.6636ZM21.0388 12.8053C20.1958 11.8616 18.9307 11.5203 17.8447 11.8566C16.7356 12.2002 15.8794 13.2267 15.8183 14.8684L16.5178 14.8944C16.5693 13.5109 17.2621 12.7699 18.0519 12.5253C18.8648 12.2735 19.8482 12.5233 20.5168 13.2716L21.0388 12.8053ZM21.0487 18.5424C20.9946 18.8502 20.9445 19.1226 20.8693 19.3552C20.794 19.5878 20.7048 19.7431 20.5971 19.8393L21.0634 20.3613C21.3037 20.1467 21.4426 19.857 21.5353 19.5706C21.628 19.2841 21.6854 18.9633 21.7382 18.6636L21.0487 18.5424Z"
                              fill="#1E1E1E"
                            />
                          </g>
                        </svg>
                      </a>
                    </div>
                    <img
                      src={Product2}
                      alt="Product 2"
                      className="w-full object-cover h-[270px] border-2"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xs font-medium">Cotton T Shirt</h2>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm">Full Sleeve Zipper</p>
                      <p className="text-sm">$ {productPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mx-2">
                  <button className="mb-14">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1.00004L1 11M0.999958 1L10.9999 11"
                        stroke="#5E5E5E"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center space-y-3">
                    <h1>L</h1>
                    <div className="h-7 w-7 bg-black"></div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={increaseQuantity2}
                        className="h-6 w-6 bg-gray-300"
                      >
                        +
                      </button>
                      <span className="h-6 w-6 bg-white flex items-center justify-center">
                        {quantity2}
                      </span>
                      <button
                        onClick={decreaseQuantity2}
                        className="h-6 w-6 bg-gray-300"
                      >
                        -
                      </button>
                    </div>
                    <button>
                      <svg
                        width="19"
                        height="16"
                        viewBox="0 0 19 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.95155 7.55864H2.20155V7.55864L2.95155 7.55864ZM2.95155 8.87037L2.39007 9.3676C2.52536 9.52037 2.71705 9.61142 2.92094 9.61975C3.12483 9.62807 3.32331 9.55296 3.4706 9.41174L2.95155 8.87037ZM5.76905 7.20804C6.06805 6.92137 6.07804 6.4466 5.79137 6.14761C5.50471 5.84862 5.02994 5.83863 4.73095 6.1253L5.76905 7.20804ZM1.56148 6.16943C1.28686 5.85934 0.812863 5.83057 0.502767 6.10519C0.19267 6.3798 0.163906 6.8538 0.438521 7.1639L1.56148 6.16943ZM13.8826 3.6343C14.1639 3.93837 14.6384 3.95683 14.9425 3.67555C15.2465 3.39427 15.265 2.91976 14.9837 2.6157L13.8826 3.6343ZM9.56192 0.25C5.50246 0.25 2.20155 3.51665 2.20155 7.55864H3.70155C3.70155 4.35616 6.31976 1.75 9.56192 1.75V0.25ZM2.20155 7.55864L2.20155 8.87037L3.70155 8.87037L3.70155 7.55864L2.20155 7.55864ZM3.4706 9.41174L5.76905 7.20804L4.73095 6.1253L2.4325 8.329L3.4706 9.41174ZM3.51303 8.37314L1.56148 6.16943L0.438521 7.1639L2.39007 9.3676L3.51303 8.37314ZM14.9837 2.6157C13.6387 1.16173 11.7064 0.25 9.56192 0.25V1.75C11.2731 1.75 12.811 2.47586 13.8826 3.6343L14.9837 2.6157Z"
                          fill="#8A8A8A"
                        />
                        <path
                          d="M16.0436 7.29688L16.6043 6.79875C16.4688 6.64627 16.2771 6.55554 16.0733 6.54746C15.8695 6.53939 15.6712 6.61466 15.5241 6.75594L16.0436 7.29688ZM13.2308 8.95842C12.9321 9.24534 12.9225 9.72012 13.2094 10.0189C13.4963 10.3176 13.9711 10.3272 14.2698 10.0403L13.2308 8.95842ZM17.4396 9.99748C17.7147 10.3071 18.1888 10.3351 18.4985 10.06C18.8081 9.78493 18.8361 9.31088 18.561 9.00122L17.4396 9.99748ZM5.08887 12.5546C4.80541 12.2526 4.33078 12.2375 4.02875 12.521C3.72671 12.8044 3.71165 13.2791 3.99511 13.5811L5.08887 12.5546ZM9.40795 15.9172C13.4787 15.9172 16.7936 12.6533 16.7936 8.6086H15.2936C15.2936 11.8084 12.6668 14.4172 9.40795 14.4172V15.9172ZM16.7936 8.6086V7.29688H15.2936V8.6086H16.7936ZM15.5241 6.75594L13.2308 8.95842L14.2698 10.0403L16.5631 7.83781L15.5241 6.75594ZM15.4829 7.795L17.4396 9.99748L18.561 9.00122L16.6043 6.79875L15.4829 7.795ZM3.99511 13.5811C5.34385 15.0182 7.2712 15.9172 9.40795 15.9172V14.4172C7.69966 14.4172 6.16389 13.7001 5.08887 12.5546L3.99511 13.5811Z"
                          fill="#8A8A8A"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dotted border-gray-500 my-6 lg:hidden"></div>

            <div className="lg:w-1/3">
              <div className="md:pt-14 md:px-10 md:pb-10 p-4 border">
                <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">Subtotal</p>
                  <p>$ {subtotal}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">Shipping</p>
                  <p>$ {shipping}</p>
                </div>
                <div className="border-t border-dotted border-gray-500 w-full my-6"></div>
                <div className="flex justify-between font-bold mb-12">
                  <p>
                    TOTAL{" "}
                    <span className="text-gray-500 text-xs font-sans">
                      (TAX INCL.)
                    </span>
                  </p>
                  <p>$ {total}</p>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-7 w-7 rounded-none text-xz font-extralight"
                    />
                    I agree to the Terms and Conditions
                  </label>
                </div>
                <button className="w-full bg-[#D9D9D9] hover:text-white hover:bg-black text-center py-2 font-bold">
                  CONTINUE
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-dotted border-gray-500 md:w-2/3 my-6 hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
