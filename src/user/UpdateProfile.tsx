import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Publish } from "@mui/icons-material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { User } from "../redux/userRedux";
import { updateUser } from "../auth/ApiCalls";

interface UserInputs {
  username?: string;
  firstName?: string;
  lastName?: string;
  profilePic?: string;
  email?: string;
  id?: number;
}
const UpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Input = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;

const UpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const Update = styled.div`
  flex: 2;
  padding: 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;
const Upload = styled.div`
  display: flex;
  align-items: center;
`;
const UpdateProfile = () => {
  const [inputs, setInputs] = useState<UserInputs>({});
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value, 10) : value;
    setInputs((prev) => ({ ...prev, [name]: val }));
  };
  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, "users/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userId = user ? user.id : 0; // Default to 0 if user is null
          const userRole = user ? user.role : ""; // Default to empty string if user is null

          const updatedUser: User = {
            username: inputs.username || (user ? user.username : ""),
            firstName: inputs.firstName || (user ? user.firstName : ""),
            lastName: inputs.lastName || (user ? user.lastName : ""),
            email: inputs.email || (user ? user.email : ""),
            profilePic: downloadURL || (user ? user.profilePic : ""),
            id: userId,
            role: userRole,
          };
          console.log("updateduser", updatedUser);
          updateUser(updatedUser, dispatch);
        });
      },
    );
  };
  return (
    <div>
      <Navbar />
      <Update>
        <span className="userUpdateTitle">Edit</span>
        <Form>
          <div className="userUpdateLeft">
            <UpdateItem>
              <label>Username</label>
              <Input
                type="text"
                name="username"
                value={inputs.username || user?.username || ""}
                placeholder="Username"
                onChange={handleChange}
              />
            </UpdateItem>
            <UpdateItem>
              <label>First Name</label>
              <Input
                type="text"
                name="firstName"
                value={inputs.firstName || user?.firstName || ""}
                placeholder="First Name"
                onChange={handleChange}
              />
            </UpdateItem>
            <UpdateItem>
              <label>Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={inputs.lastName || user?.lastName || ""}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </UpdateItem>
            <UpdateItem>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={inputs.email || user?.email || ""}
                placeholder="Email"
                onChange={handleChange}
              />
            </UpdateItem>
          </div>
          <UpdateRight>
            <Upload>
              <Image
                className="userUpdateImg"
                src={user?.profilePic}
                alt=""
              />
              <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files && e.target.files[0])
                }
                style={{ display: "none" }}
              />
            </Upload>
            <UpdateButton onClick={handleClick}>Update</UpdateButton>
          </UpdateRight>
        </Form>
      </Update>
    </div>
  );
};

export default UpdateProfile;
