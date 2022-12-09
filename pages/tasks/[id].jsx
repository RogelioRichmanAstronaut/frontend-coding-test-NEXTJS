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

const Task = ({ task }) => {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [status, setStatus] = useState(task.completed);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const error = false;
  const goBack = () => {
    router.push(`/`);
  };

  const searchError = () => {
    console.log(error);
    if ((title.length <= 1) | (desc.length <= 3) | (startDate === null)) {
      error = true;
    } else {
      error = false;
    }
  };
  // const handleDates = (e) => {
  //   setValues({...values,[e.tar]})
  // }
  const handleUpdate = async () => {
    searchError();
    if (error === false) {
      const updatedTask = {
        ...task,
        title,
        description: desc,
        completed: status,
        endDate,
        startDate,
      };
      try {
        const res = await axios.put(
          "http://localhost:3001/tasks/" + task.id,
          updatedTask
        );
        console.log(res.data);
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

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3001/tasks/${params.id}`);
  return {
    props: {
      task: res.data,
    },
  };
};
export default Task;
