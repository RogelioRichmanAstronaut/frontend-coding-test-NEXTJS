import Image from "next/image";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Container = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  .left {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .right {
    flex: 1;
  }
  .imgContainer {
    width: 80%;
    height: 80%;
    position: relative;
  }
  .age {
    color: black;
    font-size: 24px;
    font-weight: 400;
    border-bottom: 1px solid black;
  }
  .editButton {
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
  .taskTitle {
    margin-top: 20%;
  }
`;

const StyledTable = styled.div`
  padding: 0;
  display: flex;
  .item {
    flex: 1;
  }
  .table {
    width: 100%;
    border-spacing: 20px 20px;
    text-align: left;
  }
  .button1 {
    border: none;
    color: white;
    padding: 5px;
    cursor: pointer;
    background-color: teal;
    margin-right: 10px;
  }
  .button2 {
    background-color: crimson;
  }
`;
const Person = ({ person, tasks }) => {
  const router = useRouter();
  const [tasksList, setTaskList] = useState(tasks);

  //If the task has an endDate property that is set to a day before the current date, the task will be automatically marked as completed.
  const completePastTasks = async (item) => {
    try {
      const res = await axios.put("http://localhost:3001/tasks/" + item.id, {
        ...item,
        completed: true,
      });
      setTaskList([res.data, ...tasks.filter((task) => task.id !== item.id)]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    var q = new Date();
    var m = q.getMonth();
    var d = q.getDay();
    var y = q.getFullYear();

    var date = new Date(y, m, d);
    //set all old tasks to completed
    tasks.filter((task) => {
      if (task.endDate != null) {
        var myDate = new Date(task.endDate);

        if (date > myDate && !task.completed) {
          //tiempo pasado, tiene que completarse
          completePastTasks(task);
        }
      }
    });
  }, [tasks]);
  const handleState = async (id) => {
    const item = tasks.filter((task) => task.id === id)[0];
    const currentStatus = item.completed;
    try {
      const res = await axios.put("http://localhost:3001/tasks/" + id, {
        ...item,
        completed: !currentStatus,
      });
      router.reload(window.location.pathname);
      //   setTaskList([res.data, ...tasks.filter((task) => task.id !== id)]);
      //   setTaskList((prev) => [...prev].sort((a, b) => a.id - b.id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <div className="left">
        <button
          className="editButton"
          onClick={() => router.push(`/profile/${person.id}/edit`)}
        >
          Edit
        </button>
        <div className="imgContainer">
          <Image
            src={person.picture}
            objectFit="contain"
            layout="fill"
            alt=""
            priority
          />
        </div>
      </div>
      <div className="right">
        <h1 className="title">{person.fullName}</h1>
        <span className="age">{person.age}</span>
        <p className="nickname">{person.nickname}</p>
        <p className="gender">{person.gender}</p>
        <p className="gender">{person.occupation}</p>
        <h3 className="taskTitle">TASKS:</h3>
        <StyledTable>
          <div className="item">
            <table className="table">
              <tbody>
                <tr className="trTitle">
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Completed</th>
                </tr>
              </tbody>
              {tasksList.map((task) => (
                <tbody key={task.id}>
                  <tr className="trTitle">
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
                    <td>{task.completed ? "Si" : "No"}</td>
                    <td>
                      <button
                        className="button1"
                        onClick={() => handleState(task.id)}
                      >
                        Change State
                      </button>
                      <Link href={`/tasks/${task.id}`}>
                        <button className="button1 button2">Edit Task</button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </StyledTable>
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3001/people/${params.id}`);
  const res2 = await axios.get(
    `http://localhost:3001/tasks?personId=${params.id}`
  );
  return {
    props: {
      person: res.data,
      tasks: res2.data,
    },
  };
};

export default Person;
