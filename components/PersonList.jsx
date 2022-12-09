import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import filterHelper from "../utils/filter";
import People from "./People";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .desc {
    font-size: 24px;
    color: #444;
    width: 70%;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .filter {
    margin: 20px;
  }
  .filterText {
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
  }

  .select {
    padding: 10px;
    margin-right: 20px;
  }
`;

const PersonList = ({ peopleList }) => {
  const router = useRouter();

  const [gender, setGender] = useState("all");
  const [age, setAge] = useState("asc");
  const handleGender = (e) => {
    setGender(e.target.value);
    filterHelper({ router, gender });
  };
  return (
    <Container>
      <h1 className="title">This is person list</h1>
      <p className="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit obcaecati
        nobis doloremque officiis! Iusto nobis harum consequatur corporis fugit
        est aspernatur dolore, illo quidem aliquam, nihil vel, ducimus fugiat
        tempora.
      </p>
      <FilterContainer>
        <div className="filter">
          <span className="filterText">Filter Person:</span>
          <select
            name="age"
            className="select"
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <select name="gender" className="select" onChange={handleGender}>
            <option value="all">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </FilterContainer>
      <People peopleList={peopleList} age={age} gender={gender} />
    </Container>
  );
};

export default PersonList;
