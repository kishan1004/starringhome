import React, { useState, useEffect } from "react";
import Product2img from "../../images/imgproduct2.jpeg";
import Product4img from "../../images/imgproduct4.jpeg";
import Product5img from "../../images/imgproduct5.jpeg";
import Product6img from "../../images/imgproduct6.jpeg";
import { Link } from "react-router-dom";
import { userProductsList } from "../../api/user";
import { useQuery } from "react-query";
import {Pagination} from 'antd'
import {getCategoryApi} from '../../api/user'


  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  const tags = ["Top Rated", "BestSeller", "NewTrend", "Classic"];
  const collections = [
    "Summer",
    "Winter",
    "Festival",
    "Beach",
    "Trekking",
    "Sports",
    "Coords",
  ];

const initialFilter = {
  sizes:"L",
  categories:[],
  tags:[],
  collections:[],
  ratings:[],
  pricegt:0,
  pricelt:5000

}

const AllProductsPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [searchText,setSearchText] = useState('')
  const[filterData,setFilterData] = useState(initialFilter)

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] =
    useState(false);
  const [categories,setCategories] = useState([])


    const {data:products,isLoading,isError,refetch} = useQuery({
      queryKey:['allproductrs',{currentPage,searchText}],
      queryFn:()=>userProductsList(currentPage,searchText,filterData)
    })

     const {data:category} = useQuery({
      queryKey:['category'],
      queryFn:()=> getCategoryApi()
    })

    useEffect(()=>{
     if(category){
      const categorynames = category.data.detail.data.map((list)=>{
        return list.name
      })
      setCategories(categorynames)
     }
  },[category])

   

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleDropdown2 = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="bg-gray-100 font-beatrice min-h-screen">
      <div className="w-full  px-4 pb-5">
        <Link to="/">
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

      <div className="lg:flex">
        <div className="pb-5">
          <div
            className="lg:hidden flex justify-between items-center p-4  bg-gray-100"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <h3 className="text-xl font-bold">Filters</h3>
            <button onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
              <svg
                width="28"
                height="18"
                viewBox="0 0 28 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 1L1 1"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19 9L1 9"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 17H1"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <aside
            className={`${
              isSidebarVisible ? "block" : "hidden"
            } lg:block pt-4 px-5  bg-gray-100 z-50 absolute top-0 left-0 min-h-full lg:relative`}
          >
            <h3 className="text-xl font-bold mb-4">Filters</h3>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Size</h4>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFilterData({...filterData, sizes:size})}
                    className={`border w-10 h-10 font-medium text-sm ${
                      filterData.sizes === size
                        ? "border-gray-900 text-gray-900 bg-gray-300"
                        : "border-gray-500 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {filterData.sizes && (
                <p className="mt-2 text-sm text-gray-700">
                  Selected size: {filterData.sizes}
                </p>
              )}
            </div>

            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="my-4">
              <div
                className="my-4 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <h4 className="font-bold text-sm">Category</h4>
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isCategoryDropdownOpen ? "rotate-90" : ""
                  }`}
                >
                  <path
                    d="M1 10L6 5.5L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {isCategoryDropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4 pl-4">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={filterData.categories.includes(category)}
                        onChange={(value) => {
                          setFilterData({...filterData, categories:filterData.categories.includes(category) ? filterData.categories.filter((item)=> item !== category) :
                            [...filterData.categories,category]
                          })
                        }}
                        className="form-checkbox text-blue-500"
                      />
                      <span
                        className={`text-sm font-bold ${
                          filterData.categories.includes(category)
                            ? "font-bold"
                            : "text-black"
                        }`}
                      >
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="my-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleDropdown}
              >
                <h4 className="font-bold text-sm">Price Range</h4>

                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  <path
                    d="M1 10L6 5.5L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {isOpen && (
                <div className="mt-4">
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="number"
                      value={filterData.pricegt}
                      onChange={(e)=>{
                          setFilterData({...filterData,pricegt:e.target.value})
                      }}
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="5000"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                        value={filterData.pricelt}
                      onChange={(e)=>{
                          setFilterData({...filterData,pricelt:e.target.value})
                      }}
                      className="w-20 p-2 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="5000"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={filterData.pricegt}
                      onChange={(e)=>{
                          setFilterData({...filterData,pricegt:e.target.value})
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={filterData.pricelt}
                      onChange={(e)=>{
                          setFilterData({...filterData,pricelt:e.target.value})
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <p className="mt-2 text-sm font-bold">
                    Selected range: ${filterData.pricegt} - ${filterData.pricelt}
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="my-4">
              <div
                className="my-4 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setIsCollectionDropdownOpen(!isCollectionDropdownOpen)
                }
              >
                <h4 className="font-bold text-sm">Collections</h4>
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isCollectionDropdownOpen ? "rotate-90" : ""
                  }`}
                >
                  <path
                    d="M1 10L6 5.5L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {isCollectionDropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4 pl-4">
                  {collections.map((collection) => (
                    <label
                      key={collection}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={filterData.collections.includes(collection)}
                        onChange={() => {
                            setFilterData({...filterData, collections:filterData.collections.includes(collection) ? filterData.collections.filter((item)=> item !== collection) :
                            [...filterData.collections,collection]
                          })
                        }}
                        className="form-checkbox text-blue-500"
                      />
                      <span
                        className={`text-sm font-bold ${
                          filterData.collections.includes(collection)
                            ? "font-bold"
                            : "text-black"
                        }`}
                      >
                        {collection}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="my-4">
              <div
                className="my-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
              >
                <h4 className="font-bold text-sm">Tags</h4>
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isTagDropdownOpen ? "rotate-90" : ""
                  }`}
                >
                  <path
                    d="M1 10L6 5.5L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {isTagDropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4 pl-4">
                  {tags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filterData.tags.includes(tag)}
                        onChange={() => {
                            setFilterData({...filterData, tags:filterData.tags.includes(tag) ? filterData.tags.filter((item)=> item !== tag) :
                            [...filterData.tags,tag]})
                        }}
                        className="form-checkbox text-blue-500"
                      />
                      <span
                        className={`text-sm font-bold ${
                         filterData.tags.includes(tag)
                            ? "font-bold"
                            : "text-black"
                        }`}
                      >
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="my-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleDropdown2}
              >
                <h4 className="font-bold text-sm">Rating</h4>
                <svg
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${
                    isDropdownOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <path
                    d="M1 10L6 5.5L1 1"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filterData.ratings.includes(rating)}
                        onChange={() => {
                            setFilterData({...filterData, ratings:filterData.ratings.includes(rating) ? filterData.ratings.filter((item)=> item !== rating) :
                            [...filterData.ratings,rating]})
                        }}
                        className="form-checkbox h-4 w-4 text-yellow-400 border-gray-300 rounded"
                      />
                      <div
                        className={`flex items-center ml-2 ${
                          filterData.ratings.includes(rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                      >
                        {[...Array(rating)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            className="mr-1"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <span className="text-sm">{rating} stars</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dotted border-gray-500 w-full my-4"></div>

            <div className="flex space-x-4 my-6">
              <button
                onClick={()=>{
                  setFilterData(initialFilter)
                  setTimeout(() => {
                    refetch()
                  }, 500);
                }}
                className="w-full py-2 bg-black hover:text-[#D9D9D9] text-white font-semibold rounded"
              >
                Clear All
              </button>
              <button
                onClick={()=>{
                  refetch()
                }}
                className="w-full py-2 bg-[#D9D9D9] text-black hover:text-white font-semibold rounded"
              >
                Apply
              </button>
            </div>
          </aside>

          {isSidebarVisible && (
            <div
              onClick={() => setIsSidebarVisible(false)}
              className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            />
          )}
        </div>

        <div className="p-4 w-full overflow-hidden bg-gray-100">
          <p className="text-xs font-medium mb-4">Home / Products</p>
          <h1 className="text-xl font-bold mb-3">PRODUCTS</h1>

          <div className="flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0 items-start">
            {/* Search Input */}
            <div className="relative md:w-1/3 w-full cursor-pointer">
              <svg
                onClick={() => document.getElementById("searchInput").focus()}
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                <circle
                  cx="7.80834"
                  cy="7.80834"
                  r="6.80834"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.825 12.8242L15.3333 15.3326"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                id="searchInput"
                className="w-full pl-10 pr-8 bg-[#D9D9D9] rounded-sm p-2 text-sm text-gray-700 focus:outline-none"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
              />

              {/* Clear (X) button */}
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            {/* <div className="flex flex-wrap lg:justify-start justify-between gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`border-2 text-gray-600 md:w-28 w-20 p-1 font-medium text-xs ${
                    selectedFilter === filter
                      ? "text-black border-black"
                      : "text-[#D9D9D9]"
                  } hover:text-black`}
                >
                  {filter}
                </button>
              ))}
            </div> */}
          </div>

          {/* Display Filtered Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 pt-10">
            {products ?
            products?.data.detail.total === 0 ? (
              <p className="text-gray-500">No items found for this filter.</p>
            ):
             products.data.detail.data.map(({ _id, name, photos, price, offerPrice }) => {
                // Find the item to calculate max rating and offer percentage
                // const maxRating = Math.max(...item.ratings);
                const offerPercentage = Math.round(
                  ((price - offerPrice) / price) * 100
                );
                return (
                  <div key={_id}> <Link to={`/one-product?id=${_id}`}>
                    <div className="border rounded-md p-4">
                      <img
                        src={photos[0]}
                        alt={name}
                        className="h-80 w-full object-contain"
                      />
                      <div className="flex items-center space-x-3 pt-2">
                        <p className="font-medium text-xs text-gray-600">
                          {name}
                        </p>
                        <p className="font-medium text-xs text-gray-600">
                          {/* ({maxRating} ratings) */}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <h2 className="font-medium text-sm">{name}</h2>
                        <p className="text-gray-600 line-through">Rs.{price}</p>
                        <p className="text-lg font-bold">Rs.{offerPrice}</p>
                        <p className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 inline-block rounded-full">
                          {offerPercentage}% OFF
                        </p>
                      </div>
                    </div>
                  </Link>
                  </div>
                 
                );
              })
             : isError && <p className="text-gray-500">Products not found Something went wrong</p> }
          </div>
          <div className=" flex justify-center pt-10 pb-5 px-5">
             <Pagination value={currentPage} onChange={(value)=>{setCurrentPage(value)}} total={products?.data?.detail.total} hideOnSinglePage />
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default AllProductsPage;
