import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../app/store";
import Spinner from "../components/smallComponents/Spinner";
import moment from "moment";
import { ActionButton } from "./ProductDetailePage";
import { ImgInputLabel } from "./dashboard/NewProductPage";
import { uploadPics } from "../firebase/firebaseConfig";
import { useUpdateProfilePicMutation } from "../app/sevices/user";

const ProfilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const { user } = useSelector((state: RootState) => state.user);

  const [updatePicture, { isLoading }] = useUpdateProfilePicMutation();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    setImage("");
    setFile(null);
    const file = e.currentTarget.files[0];

    setImage(URL.createObjectURL(file));
    setFile(file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;
    // upload to firebase
    const url = await uploadPics([file]);
    console.log(url);

    if (!url) return console.log("no photos");
    // add to mongodb
    updatePicture({ url: url[0] });
  };

  if (!user) return <Spinner />;
  return (
    <ProfileContainer>
      <section>
        <img
          src={image ? image : user.profilePic}
          alt={`${user.name} profile`}
        />
        <form onSubmit={onSubmit}>
          <ImgInputLabel htmlFor="fileInput">
            <input
              type="file"
              name="productPhotos"
              id="fileInput"
              accept="image/*"
              onChange={onImageChange}
            />
            Upload Image
          </ImgInputLabel>
          <ActionButton type="submit">Apply change</ActionButton>
        </form>
        {isLoading && <Spinner />}
      </section>
      <section>
        <h3>Full Name</h3>
        <p>{user.name}</p>
        <h3>Email</h3>
        <p>{user.email}</p>
        <h3>User since</h3>
        <p>{moment(user.createdAt).format("MMMM DD YYYY")}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1rem",
          }}
        >
          <ActionButton>My orders</ActionButton>
          <ActionButton>Change Password</ActionButton>
        </div>
      </section>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  section {
    flex: 1;
    &:first-child {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      form {
        width: 50%;
        margin-top: 1rem;
      }
      button {
        margin-top: 1rem;
      }
    }
    &:nth-child(2) {
      padding: 1rem;
      line-height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  img {
    border-radius: 50%;
    height: 40vw;
    width: 40vw;
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default ProfilePage;
