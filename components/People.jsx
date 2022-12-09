import { useEffect, useState } from "react";
import styled from "styled-components";
import PersonCard from "./PersonCard";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const People = ({ peopleList, age, gender }) => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    if (gender != "all") {
      setFilteredPersons(
        peopleList.filter((item) => item["gender"].includes(gender))
      );
    } else {
      setFilteredPersons(peopleList);
    }
    if (age === "asc") {
      setFilteredPersons((prev) => [...prev].sort((a, b) => a.age - b.age));
    } else {
      setFilteredPersons((prev) => [...prev].sort((a, b) => b.age - a.age));
    }
  }, [gender]);

  useEffect(() => {
    if (age === "asc") {
      setFilteredPersons((prev) => [...prev].sort((a, b) => a.age - b.age));
    } else {
      setFilteredPersons((prev) => [...prev].sort((a, b) => b.age - a.age));
    }
  }, [age]);
  return (
    <Wrapper>
      {filteredPersons.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </Wrapper>
  );
};

export default People;
