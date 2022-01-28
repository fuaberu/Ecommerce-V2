import React, { useState } from "react";
import Input from "../../components/form/Input";
import { MdInput } from "react-icons/md";
import { BsCurrencyDollar, BsBoxSeam } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import styled from "styled-components";
import { uploadPics } from "../../firebase/firebaseConfig";
import { useCreateProductMutation } from "../../app/sevices/products";

const NewProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    setImages([]);
    setFiles([]);
    const files = Array.from(e.currentTarget.files);

    files.forEach((file) => {
      setImages((prev) => [...prev, URL.createObjectURL(file)]);
      setFiles((prev) => [...prev, file]);
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // upload to firebase
    const urls = uploadPics(files);

    // add to mongodb
    createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      numOfReviews: 0,
      mainImage: urls[0],
      detailedImages: urls.splice(1, urls.length - 1),
      category,
    });
  };

  return (
    <Container>
      <form onSubmit={(e) => onSubmit(e)}>
        <Input
          state={name}
          setState={setName}
          placeholder="Product Name"
          icon={<MdInput size={18} />}
        />
        <Input
          state={price}
          setState={setPrice}
          placeholder="Price"
          icon={<BsCurrencyDollar size={18} />}
        />
        <Input
          state={description}
          setState={setDescription}
          placeholder="Description"
          icon={<GrNotes size={18} />}
        />
        <Input
          state={stock}
          setState={setStock}
          placeholder="Stock"
          icon={<BsBoxSeam size={18} />}
        />
        <ImgInputLabel htmlFor="fileInput">
          <input
            type="file"
            name="productPhotos"
            id="fileInput"
            accept="image/*"
            onChange={onImageChange}
            multiple
          />
          Upload Images
        </ImgInputLabel>
        <div>
          {images.map((image, index) => {
            return <img key={index} src={image} alt="preview" />;
          })}
        </div>
        <button type="submit">Create</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 10vh;
  form {
    width: 90vw;
    max-width: 380px;
    margin: auto;
    text-align: center;
    button {
      background-color: goldenrod;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
    }
  }
  div {
    img {
      max-height: 15vh;
      max-width: 15vh;
      &:not(:first-child) {
        margin-left: 0.5rem;
      }
    }
  }
`;

const ImgInputLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

export default NewProductPage;
