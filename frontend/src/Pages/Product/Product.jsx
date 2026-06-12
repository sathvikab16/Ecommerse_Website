import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../../api/axios";
function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category ? `products/category/${category}` : "products";
        const res = await API.get(url);

        setProducts(res.data);
      }
      catch (error) {
        console.log(error);
      }

    }
    fetchProducts();

  }, [category])

  return (
    <div className='min-h-[78.9vh] '>
      <div className='flex justify-between items-center p-5'>
        <div className=''>

          <select name="" id="" onChange={(e) => setCategory(e.target.value)} className=' w-30 border outline-0 border-rose-300 rounded p-1 '>
            <option className='' value="" >View All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div onChange={(e) => setCategory(e.target.value)} className=''><button className='bg-rose-500 w-22 h-8 rounded text-white text-[14px] cursor-pointer'>View More</button></div>

      </div>
      <div className="flex  flex-wrap m-8 gap-4">
        {products.map((item) => (
          <div className='  shadow-[0_0_4px_gray] w-[240px] flex flex-col  gap-2 p-3  rounded-lg'>
              <div className=' flex justify-center  '><img src={item.image} className='object-cover h-50 w-50' alt="" /></div>
              <div className="text-1xl font-semibold line-clamp-1"><h1>{item.title}</h1></div>
              <div className="text-xs font-light line-clamp-2"><p>{item.description}</p></div>
              <div className="text-sem font-semibold "><span>$ {item.price}</span></div>
              <div className='flex justify-between items-center'>
              <Link to={`/products/${item.id}`} key={item.id}>
                <button className='bg-rose-500 hover:bg-rose-600 cursor-pointer w-20 h-8 text-white text-[14px] rounded flex justify-center items-center'>Details</button>
          </Link>
                <Link to={`/products/${item.id}`} >
                <button className='bg-black hover:bg-gray-800 w-20 h-8 text-white cursor-pointer text-[14px] rounded flex justify-center items-center'>Buy Now</button>
                </Link>
              </div>
            </div>

        ))}
      </div>

    </div>
  )
}

export default Product
