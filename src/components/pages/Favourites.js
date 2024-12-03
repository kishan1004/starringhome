import React, { useState, useEffect } from "react";
import SimilarProduct1 from "../../images/imgproduct2.jpeg";
import SimilarProduct2 from "../../images/imgproduct4.jpeg";
import SimilarProduct3 from "../../images/imgproduct5.jpeg";
import SimilarProduct4 from "../../images/imgproduct6.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { getAllFavourites,addFavouriteProduct } from "../../api/user";

const Favourites = () => {
  const navigate = useNavigate()
  const [similarProducts, setSimilarProducts] = useState([
  ]);

  // useEffect(async () => {
  //   const response = await axios.get("/backend/?search=shirt&category=all");
  //   setSimilarProducts(response);
  // }, []);

  const handleDelete = (id) => {
    console.log([id])

    addFavouriteProduct([id], "REMOVE").then((res)=>{
      getFavItems();
    })

    setSimilarProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // if (loading) {
  //   return <div>Loading</div>;
  // }

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
        console.log('all', allProducts);
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 font-beatrice">
      <section className="max-w-full md:px-10 px-4">
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>
      <div>
        <div className="md:p-10 p-3 pb-10">
          <h3 className="text-2xl font-semibold mb-4">Favourites</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
            {similarProducts.map((product) => {
              const offerPercentage = Math.round(
                ((product.originalPrice - product.offerPrice) /
                  product.originalPrice) *
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
                  <Link to={`/one-product?id=${product.id}`}>
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
                        {offerPercentage}% OFF
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
  );
};

export default Favourites;
