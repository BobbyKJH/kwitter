import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nweet from "../components/Nweet";
import { dbService } from "../myBase";
// import { collection, getDocs, query } from "firebase/firestore";

// 전체 박스
const Container = styled.div`
  display: block;
`;

// form
const Form = styled.form`
  display: block;
  text-align: center;
  border: 1px solid black;
`;

// 채팅
const ChatInput = styled.input`
  font-family: "Press Start 2P", cursive;
  display: block;
  margin: 0 auto;
  width: 50%;
  padding: 10px;
`;

// 보내기 버튼
const SendBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 30%;
  font-size: 0.3rem;
  padding: 10px;
`;

// 채팅 박스
const Box = styled.div`
  display: block;
  width: 100%;
  height: 500px;
  border: 1px solid black;
  overflow: auto;
`;

function Home({ userObj }) {
  // realTime 저장
  const [nweet, setNweet] = useState("");
  // 채팅 불러오기
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const q = query(collection(dbService, "kwitter"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getNweets();
    // re-rendering RealTime
    dbService.collection("kwitter").onSnapshot((snapshot) => {
      console.log(snapshot.docs);
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  // 채팅 onChnage
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  // form
  const onSubmit = async (e) => {
    e.preventDefault();
    // 채팅을 남기면 firebase realtime에 저장
    await dbService.collection("kwitter").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  return (
    <Container>
      <Box>
        {nweets.map((chat) => (
          <Nweet
            key={chat.id}
            nweetObj={chat}
            isOwner={chat.creatorId === userObj.uid}
          />
        ))}
      </Box>
      <Form onSubmit={onSubmit}>
        <ChatInput
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="입력하세요."
          maxLength={150}
        />
        <SendBtn type="submit" value="kweet">
          보내기
        </SendBtn>
      </Form>
    </Container>
  );
}

export default Home;
