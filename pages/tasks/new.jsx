import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

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
  .noneButton {
    width: 150px;
  }
  .errorMsg {
    color: red;
  }
`;

const Task = () => {
  const router = useRouter();
  var q = new Date();
  var m = q.getMonth();
  var d = q.getDay();
  var y = q.getFullYear();
  const date = new Date(y, m, d);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(false);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [personId, setPersonId] = useState(1);
  const error = false;
  const goBack = () => {
    router.push(`/`);
  };

  const searchError = () => {
    if ((title.length <= 1) | (desc.length <= 3) | (startDate === null)) {
      error = true;
    } else {
      error = false;
    }
  };
  const handleUpdate = async () => {
    searchError();
    if (error === false) {
      const newTask = {
        title,
        description: desc,
        completed: status,
        endDate,
        startDate,
        personId,
      };
      try {
        const res = await axios.post("http://localhost:3001/tasks/", newTask);
        goBack();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container>
      <div className="wrapper">
        <h1>Edit page</h1>
        <div className="item">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length <= 1 ? (
            <label className="errorMsg">min length: 1</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Description</label>
          <input
            className="input"
            type="text"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {desc.length <= 3 ? (
            <label className="errorMsg">min length: 3</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">person ID task owner</label>
          <input
            className="input"
            type="number"
            defaultValue={personId}
            onChange={(e) => setPersonId(e.target.value)}
          />
          {personId.length <= 0 ? (
            <label className="errorMsg">min id: 1</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">Status</label>
          <select
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={true}> completed</option>
            <option value={false}> not completed</option>
          </select>
        </div>
        <div className="item">
          <label className="label">Start Date</label>
          <input
            className="input"
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {startDate === null ? (
            <label className="errorMsg">needs a start date</label>
          ) : null}
        </div>
        <div className="item">
          <label className="label">End Date</label>
          <input
            className="input"
            type="date"
            defaultValue={endDate}
            id="endDateID"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="noneButton"
            onClick={() => {
              setEndDate(null);
              document.getElementById("endDateID").value = "";
            }}
          >
            clear end date
          </button>
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

export default Task;
