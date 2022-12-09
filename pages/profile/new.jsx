import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    width: 500px;
    padding: 10px 50px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .label {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  .input {
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
  }
  .uploadButton {
    width: 25%;
    padding: 5px 0px;
    margin-top: 5px;
    border: none;
    background-color: #2d8000;
    color: white;
    cursor: pointer;
    align-self: flex-start;
    font-weight: 600;
  }
  .saveButton {
    width: 50%;
    border: none;
    background-color: teal;
    color: white;
    font-weight: 500;
    cursor: pointer;
    padding: 10px 0px;
    align-self: center;
    font-weight: 700;
  }
  .cancelButton {
    padding: 5px 0px;
    margin-top: 5px;
    width: 25%;
    background-color: crimson;
    font-weight: 500;
  }
  .goBackButton {
    padding: 10px;
    margin: 20px;
    background-color: #d1411e;
    width: 150px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    border: none;
  }
  .errorMsg {
    color: red;
  }
`;
const edit = () => {
  const router = useRouter();
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const error = false;

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
  };

  const goBack = () => {
    router.push(`/`);
  };

  const uploadImage = async () => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "uploadsTest");

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/io-company/image/upload",
          data
        );
        const url = uploadRes.data.url;

        setPicture(url);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const searchError = () => {
    if (
      (name.length <= 1) |
      (age <= 1) |
      (occupation.length <= 3) |
      (nickname.length <= 3)
    ) {
      error = true;
    } else {
      error = false;
    }
  };
  const handleUpdate = async () => {
    searchError();
    if (error === false) {
      const newPerson = {
        picture,
        fullName: name,
        age,
        occupation,
        nickname,
        gender,
      };
      try {
        const res = await axios.post(
          "http://localhost:3001/people/",
          newPerson
        );
        goBack();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container>
      <div className="wrapper">
        <button className="goBackButton" onClick={() => goBack()}>
          Go Back
        </button>
        <h1>Edit page</h1>
        <div className="item">
          <img src={picture} alt="" width="250px" height="250px" />
          <label className="label">Add new Person Picture</label>
          <input type="file" onChange={(e) => handleFile(e)} />
          {file ? (
            <div>
              <button className="uploadButton" onClick={(e) => uploadImage()}>
                Upload Image
              </button>
              <label className="label">Click to upload the new image</label>
            </div>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Full Name</label>
          <input
            className="input"
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length <= 1 ? (
            <label className="errorMsg">min length: 1</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Nickname</label>
          <input
            className="input"
            type="text"
            defaultValue={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {name.length <= 1 ? (
            <label className="errorMsg">min length: 1</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Age</label>
          <input
            className="input"
            placeholder="age"
            type="number"
            defaultValue={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {age.length <= 1 ? (
            <label className="errorMsg">min age: 1</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Gender</label>
          <select
            className="input"
            defaultValue={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div className="item">
          <label className="label">Occupation</label>
          <input
            className="input"
            type="text"
            defaultValue={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          {age.length <= 1 ? (
            <label className="errorMsg">min length: 3</label>
          ) : null}
        </div>
        <button className="saveButton" onClick={(e) => handleUpdate()}>
          Save
        </button>
        <button className="saveButton cancelButton" onClick={(e) => goBack()}>
          Cancel
        </button>
      </div>
    </Container>
  );
};

export default edit;
