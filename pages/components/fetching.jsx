export default function fetchProducts(baseURL, products, setProducts) {
  fetch(`${baseURL}/products`)
    .then((res) => res.json())
    .then(({ products }) => setProducts(products));
}
