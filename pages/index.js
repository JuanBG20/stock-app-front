import { useEffect, useState } from "react";
import fetchProducts from "./components/fetching";
import ProductList from "./components/productList";
import NewProduct from "./components/newProduct";
import NewMovement from "./components/newMovement";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(baseURL, products, setProducts);
  }, []);

  return (
    <>
      <div>
        <NewProduct
          baseURL={baseURL}
          products={products}
          setProducts={setProducts}
        />
        <ProductList products={products} />
        <NewMovement baseURL={baseURL} products={products} />
      </div>
    </>
  );
}
