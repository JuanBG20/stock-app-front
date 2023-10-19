export default function fetchProducts(baseURL, products, setProducts) {
  /* fetch(`${baseURL}/products`)
    .then((res) => res.json())
    .then(({ products }) => setProducts(products)); */

  fetch("https://stock-app-back-dev-cchq.2.us-1.fl0.io/api/v1/products")
    .then((res) => res.json())
    .then(({ products }) => setProducts(products));
}
