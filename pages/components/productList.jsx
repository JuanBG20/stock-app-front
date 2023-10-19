import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductList({ baseURL, products }) {
  const handleDelete = (_id) => {
    fetch(`${baseURL}/products/${_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));

    location.reload();
  };

  return (
    <>
      <div className="container containerResponsive">
        <h1>Lista de productos</h1>

        <div className="productsContainer productResponsive">
          {products?.map(({ _id, name, price, stock }) => (
            <div className="dataContainer" key={_id}>
              <span>{name}</span>
              <div className="numberData">
                <span className="data">${price}</span>
                <span className="data">Stock: {stock}</span>
                <div>
                  <span className="spanFirstIcon">
                    <FontAwesomeIcon
                      onClick={() => handleDelete(_id)}
                      icon={faTrash}
                      className="icon"
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
