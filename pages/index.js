import { useState, useEffect } from "react";

export default function Home() {
  const initialState = { name: "", price: 0 };

  const [product, setProduct] = useState(initialState);
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setProduct({
      ...product,
      [inputName]: inputValue,
    });
  };

  const handleClick = async (e) => {
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
      setProduct(initialState);
      const newProducts = [data.product, ...products];
      setProducts(newProducts);
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
            <button onClick={handleClick}>Crear producto</button>
          </form>
        </div>
        <div className="products-container">
          {products.map(({ _id, name, price }) => (
            <div className="product df aic jcsb p5 mb5 br5" key={_id}>
              <span>{name}</span>
              <div className="df fdc aie">
                <span>${price}</span>
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${_id}`,
                      { method: "DELETE" }
                    )
                      .then((res) => res.json())
                      .then((data) => console.log(data));
                  }}
                >
                  Borrar
                </span>
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

          .br5 {
            border-radius: 0.5rem;
          }

          .mb5 {
            margin-bottom: 0.5rem;
          }

          .product {
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

          h2 {
            text-align: center;
            margin: 0.3rem;
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
        `}
      </style>
    </>
  );
}
