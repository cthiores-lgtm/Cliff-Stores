import { useEffect, useState } from "react";
import api from "./services/api";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedProduct,
    setSelectedProduct] = useState(null);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [rating, setRating] =
    useState(0);

  const [currentPage,
    setCurrentPage] = useState(1);

  const productPerPage = 8;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res =
        await api.get("/products");

      setProducts(res.data);
    } catch {
      setError(
        "Gagal mengambil data produk"
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    const res =
      await api.get(
        "/products/categories"
      );

    setCategories(res.data);
  }

  let filtered = [...products];

  if (search) {
    filtered = filtered.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(
      (item) =>
        item.category === category
    );
  }

  filtered = filtered.filter(
    (item) =>
      item.rating.rate >= rating
  );

  if (sort === "asc") {
    filtered.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "desc") {
    filtered.sort(
      (a, b) => b.price - a.price
    );
  }

  const totalPages = Math.ceil(
    filtered.length / productPerPage
  );

  const start =
    (currentPage - 1) *
    productPerPage;

  const paginatedProducts =
    filtered.slice(
      start,
      start + productPerPage
    );

  const addCart = (product) => {
    toast.success(
      `${product.title} added to cart`
    );
  };

  if (loading)
    return (
      <h1 className="loading">
        Loading...
      </h1>
    );

  if (error)
    return (
      <h1 className="error">
        {error}
      </h1>
    );

  return (
    <>
      <ToastContainer />

      <div className="container">

        <h1 className="title">
          🛒 Cliff Store
        </h1>

        <FilterBar
          categories={categories}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          rating={rating}
          setRating={setRating}
        />

        <div className="grid">
          {paginatedProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDetail={
                  setSelectedProduct
                }
                onAddCart={addCart}
              />
            )
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={
            setCurrentPage
          }
        />

        <ProductModal
          product={selectedProduct}
          close={() =>
            setSelectedProduct(null)
          }
        />
      </div>
    </>
  );
}

export default App;