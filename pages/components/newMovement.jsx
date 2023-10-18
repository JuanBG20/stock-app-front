import { useEffect, useState } from "react";

const initialState = { type: "Compra", quantity: 0 };

export default function NewMovement({ baseURL, products }) {
  const [movement, setMovement] = useState(initialState);
  const [productId, setProductId] = useState();

  const handleIdChange = (e) => {
    const value = e.target.value;
    const product = products.find((product) => product.name === value);

    setProductId(product ? product._id : "");
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;

    setMovement({ ...movement, type: value });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    setMovement({ ...movement, quantity: +value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}/products/movement/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movement),
      });
      const data = await res.json();
      console.log({ data });
      setMovement(initialState);
    } catch ({ error }) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Crear nuevo movimiento</h1>

        <form>
          <div>
            <label htmlFor="selectId">Producto: </label>
            <select onChange={handleIdChange} name="selectId">
              {products.map(({ _id, name }) => (
                <option key={_id} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="selectType">Tipo: </label>
            <select onChange={handleTypeChange} name="selectType">
              <option value="Compra">Compra</option>
              <option value="Venta">Venta</option>
            </select>
          </div>

          <input
            onChange={handleQuantityChange}
            type="number"
            name="quantity"
            value={movement.quantity}
            placeholder="Cantidad del producto"
          />

          <button onClick={handleClick}>Crear movimiento</button>
        </form>
      </div>
    </>
  );
}
