import { useState } from "react";

const initialState = { name: "", price: 0 };

export default function NewProduct({ baseURL, products, setProducts }) {
  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      setProduct(initialState);
      const newProducts = [data.product, ...products];
      setProducts(newProducts);
    } catch ({ error }) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Crear nuevo producto</h1>

        <form>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={product.name}
          />
          <input
            onChange={handleChange}
            type="number"
            name="price"
            placeholder="Precio del producto"
            value={product.price}
          />

          <button onClick={handleClick}>Crear producto</button>
        </form>
      </div>
    </>
  );
}
