import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
const Container = styled.div`
  width: 22%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  cursor: pointer;
  .title {
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
  .age {
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  .desc {
    text-align: center;
    color: #777;
  }
`;

const PersonCard = ({ person }) => {
  return (
    <Link href={`profile/${person.id}`}>
      <Container>
        <Image
          src={person.picture}
          alt=""
          width="500"
          height="500"
          objectFit="contain"
        />

        <h1 className="title">{person.fullName}</h1>
        <span className="age">{person.age}</span>
        <p className="desc">{person.occupation}</p>
      </Container>
    </Link>
  );
};

export default PersonCard;
