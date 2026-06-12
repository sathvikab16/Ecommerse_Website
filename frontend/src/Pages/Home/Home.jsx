import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[79vh] flex flex-col justify-center items-center text-center px-5">
      
      <h1 className="text-5xl font-bold mb-6"> Welcome to E-Commerce</h1>

      <p className="text-lg text-gray-600 mb-8"> Explore products, manage your cart, and view users easily.</p>

      <div className="flex gap-6">
        <Link
          to="/products"
          className="bg-rose-500 text-white px-6 py-3 rounded hover:bg-rose-600 transition"
        >
          Shop Now
        </Link>

        <Link
          to="/user"
          className="border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition"
        >
          View Users
        </Link>
      </div>

    </div>
  );
}

export default Home;