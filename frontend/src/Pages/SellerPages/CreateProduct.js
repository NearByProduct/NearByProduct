import { useState } from "react";
import React from "react";
import "../styles/sellerPage/CreateProduct.css";
import axios from "axios";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actualPrice: "",
    discountPrice: "",
    sellingPrice: "",
    images: [],
    stock: "",
    // rating: "",
    // totalRating: "",
    // reviews: "",
    shopId: "65c89e49776c9d6a9ba2b14e",
    category: "",
    genderspecific: "Neutral",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/create",
        formData
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ flexBasis: "48%" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Actual Price:
            <input
              type="text"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Discount Price:
            <input
              type="text"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Selling Price:
            <input
              type="text"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ flexBasis: "48%" }}>
          <label>
            Images:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </label>
          {formData.images.length > 0 && (
            <div>
              <strong>Selected Images:</strong>
              <ul>
                {formData.images.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <br />
          <label>
            Stock:
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </label>
          <br />
        </div>

        <div style={{ flexBasis: "100%" }}>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender specification:
            <input
              type="text"
              name="genderspecific"
              value={formData.genderspecific}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default CreateProduct;
