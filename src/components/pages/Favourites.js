import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFavourites,addFavouriteProduct } from "../../api/user";
import UserProtectLayout from "../common/UserProtectLayout";

const Favourites = () => {
  const navigate = useNavigate()
  const [similarProducts, setSimilarProducts] = useState([
  ]);

  const handleDelete = (id) => {
     const data = {
      productId: [id],
      action:"REMOVE",
    };

    addFavouriteProduct({data:data}).then((res)=>{
      getFavItems();
    })

    setSimilarProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  useEffect(() => {
    getFavItems();
  }, [])

  function getFavItems(){
    getAllFavourites().then(res=> {
      if(res.status === 401) {
        navigate('/user-login');
      } else if(res.status === 200) {
        const allProducts = res?.data?.detail?.data;
        setSimilarProducts(allProducts)
      }
    })
  }

  return (
    <UserProtectLayout>
    <div className="min-h-screen bg-gray-100 font-beatrice">
     
      <div>
        <div className="md:p-10 p-3 pb-10">
          <h3 className="text-2xl font-semibold mb-4">Favourites</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
            {similarProducts.map((product) => {
              const offerPercentage = Math.round(
                ((product.price - product.offerPrice) /
                  product.price) *
                  100
              );
              return (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-md relative"
                >
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="absolute right-0 top-0 w-5 h-5 text-gray-600 hover:text-red-600 focus:outline-none"
                  >
                    x
                  </button>
                  <Link to={`/one-product?id=${product._id}`}>
                    <img
                      src={product.photos[0]}
                      alt={product.name}
                      className="w-full h-52 object-contain mb-4"
                    />

                    <h4 className="text-sm font-medium">{product.name}</h4>
                    <div className="flex items-center md:space-x-2 space-x-1 mt-2">
                      <p className="text-xs line-through text-gray-500">
                        Rs.{product.originalPrice}
                      </p>
                      <p className="text-sm md:text-lg font-light">
                        Rs.{product.offerPrice}
                      </p>
                      <p className="text-yellow-600 text-xs md:font-medium font-light">
                        {product.offerPercentage}% OFF
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </UserProtectLayout>
  );
};

export default Favourites;
