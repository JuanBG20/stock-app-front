import { useState, useEffect } from "react";

const initialProductState = { name: "", price: 0 };
const initialMovementState = { type: "Compra", quantity: 0 };

export default function Home() {
  const [product, setProduct] = useState(initialProductState);
  const [selectedProductId, setSelectedProductId] = useState();
  const [movement, setMovement] = useState(initialMovementState);
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setProduct({
      ...product,
      [inputName]: inputValue,
    });
  };

  const handleMovementChange = (e) => {
    const inputValue = e.target.value;

    setMovement({
      ...movement,
      quantity: +inputValue,
    });
  };

  const handleSelectType = (type) => {
    setMovement({ ...movement, type });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      const data = await res.json();
      setProduct(initialProductState);
      const newProducts = [data.product, ...products];
      setProducts(newProducts);
      //fetchProducts();
    } catch ({ error }) {
      console.log(error);
    }
  };

  const handleCreateMovement = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/movement/${selectedProductId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movement),
        }
      );
      const data = await res.json();
      console.log({ data });
      setMovement(initialMovementState);
      setSelectedProductId(null);
      //fetchProducts();
    } catch ({ error }) {
      console.log(error);
    }
  };

  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then((res) => res.json())
      .then(({ products }) => {
        setProducts(products);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container df jcsb">
        <div className="df fdc">
          <h2>Crear nuevo producto</h2>
          <form>
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="Nombre del producto"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="Precio del producto"
              onChange={handleChange}
            />
            <button onClick={handleCreateProduct}>Crear producto</button>
          </form>

          <h2>Crear movimiento</h2>
          <div className="df aic mb5">
            {["Compra", "Venta"].map((type) => (
              <div
                onClick={() => handleSelectType(type)}
                className="mr5 p5 shadow br5 cursorp"
                key={type}
                style={{
                  backgroundColor:
                    type === movement.type ? "lightblue" : "white",
                }}
              >
                <span>{type}</span>
              </div>
            ))}
          </div>

          <input
            type="number"
            name="quantity"
            value={movement.quantity}
            placeholder="Cantidad del producto"
            onChange={handleMovementChange}
          />
          <button onClick={handleCreateMovement}>Crear movimiento</button>
        </div>
        <div className="products-container">
          {products.map(({ _id, name, price }) => (
            <div
              onClick={() => setSelectedProductId(_id)}
              className="shadow df aic jcsb p5 mb5 br5"
              style={{
                backgroundColor:
                  selectedProductId === _id ? "lightblue" : "white",
              }}
              key={_id}
            >
              <span>{name}</span>
              <div className="df fdc aie">
                <span>${price}</span>
                <span
                  className="fas fa-trash icon"
                  onClick={() => {
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${_id}`,
                      { method: "DELETE" }
                    )
                      .then((res) => res.json())
                      .then((data) => console.log(data));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            width: 20rem;
            margin: 0 auto;
          }

          .df {
            display: flex;
          }

          .p5 {
            padding: 0.5rem;
          }

          .mr5 {
            margin-right: 0.5rem;
          }

          .br5 {
            border-radius: 0.5rem;
          }

          .mb5 {
            margin-bottom: 0.5rem;
          }

          .shadow {
            box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
          }

          .aic {
            align-items: center;
          }

          .aie {
            align-items: end;
          }

          .jcc {
            justify-content: center;
          }

          .jcsb {
            justify-content: space-between;
          }

          .fdc {
            flex-direction: column;
          }

          .cursorp {
            cursor: pointer;
          }

          input {
            margin-bottom: 0.5rem;
            padding: 0.5rem 0.75rem;
            border: 1px solid lightgrey;
            border-radius: 0.5rem;
            outline: none;
          }

          button {
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
          }

          button:hover {
            background-color: lightgrey;
          }

          h2 {
            text-align: center;
            text-decoration: underline;
            margin: 0.3rem;
            margin-bottom: 1rem;
          }

          .products-container {
            overflow: hidden;
            overflow-y: auto;
            max-height: 20rem;
            padding: 0.5rem;
            min-width: 20rem;
          }

          .container {
            background-color: white;
            width: 50rem;
            margin: 0 auto;
            margin-top: 5rem;
            border-radius: 0.5rem;
            padding: 1rem;
          }

          .icon {
            cursor: pointer;
            color: rgba(214, 43, 43, 1);
            margin-top: 0.5rem;
          }
        `}
      </style>
    </>
  );
}
