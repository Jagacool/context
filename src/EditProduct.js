import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";

export function EditProduct() {
  const { productid } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API}/products/${productid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productid]); // Include productid in the dependency array

  return product ? <EditProductForm product={product} /> : "Loading...";
}

function EditProductForm({ product }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [poster, setPoster] = useState(product.poster);
  const [category, setCategory] = useState(product.category);
  const [rating, setRating] = useState(product.rating);
  const [description, setDescription] = useState(product.description);
  const navigate = useNavigate();

  return (
    <div className="add-product-form">
      {/* ... (rest of the form fields) ... */}
      
      <Button
        color="success"
        variant="contained"
        onClick={() => {
          const updatedProduct = {
            name,
            price,
            poster,
            category,
            rating,
            description,
          };

          fetch(`${API}/products/${product.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(() => navigate("/products"));
        }}
      >
        SAVE
      </Button>
    </div>
  );
}
