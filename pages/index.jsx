import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import PersonList from "../components/PersonList";

const HomeContainer = styled.div``;

export default function Home({ peopleList }) {
  return (
    <HomeContainer>
      <Head>
        <title>danisando test</title>
        <meta name="description" content="Daniel Sandoval next js test" />
      </Head>
      {/* <Hero /> */}
      <PersonList peopleList={peopleList} />
    </HomeContainer>
  );
}
export const getServerSideProps = async () => {
  const res = await axios.get(
    "http://localhost:3001/people?_sort=age&_order=asc"
  );
  return {
    props: {
      peopleList: res.data,
    },
  };
};
