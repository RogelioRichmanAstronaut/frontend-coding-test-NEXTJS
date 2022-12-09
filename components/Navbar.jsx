import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  background-color: black;
  display: flex;
  width: 100%;
  justify-content: space-around;
  .wrapper {
    padding: 10px 30px;
    width: 100%;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .link {
    color: white;
    text-decoration: none;
    font-size: 30px;
    letter-spacing: 2px;
  }
  a {
    color: white;
    text-decoration: none;
  }
  .item {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <div className="wrapper">
        <div className="item">
          <Link className="link2" href={`/profile/new`}>
            <a className="link2">Add new Person</a>
          </Link>
        </div>
        <div className="item">
          <Link className="link" href={`/`}>
            <a className="link">Home</a>
          </Link>
        </div>
        <div className="item">
          <Link className="link2" href={`/tasks/new`}>
            <a className="link2">Add new Task</a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
