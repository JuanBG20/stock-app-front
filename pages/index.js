import { useEffect, useState } from "react";
import fetchProducts from "./components/fetching";
import ProductList from "./components/productList";
import NewProduct from "./components/newProduct";
import NewMovement from "./components/newMovement";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  useEffect(() => {
    fetchProducts(baseURL, products, setProducts);

    setFetchingProducts(false);
  }, [fetchingProducts]);

  const handleClick = (component) => {
    setActiveComponent(component);

    component === "productList" ? setFetchingProducts(true) : "";
  };

  return (
    <>
      <div>
        <h1 className="menuTitle">J&C Impresiones 3D</h1>

        <div className="menu menuResponsive">
          <button onClick={() => handleClick("newProduct")}>
            Nuevo Producto
          </button>
          <button onClick={() => handleClick("newMovement")}>
            Nuevo Movimiento
          </button>
          <button onClick={() => handleClick("productList")}>
            Lista de Productos
          </button>
        </div>
      </div>

      {activeComponent === "newProduct" ? (
        <NewProduct
          baseURL={baseURL}
          products={products}
          setProducts={setProducts}
        />
      ) : (
        ""
      )}
      {activeComponent === "newMovement" ? (
        <NewMovement baseURL={baseURL} products={products} />
      ) : (
        ""
      )}
      {activeComponent === "productList" ? (
        <ProductList products={products} />
      ) : (
        ""
      )}
    </>
  );
}
