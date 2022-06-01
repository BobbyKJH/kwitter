import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { authService, firebaseInstance } from "../myBase";

// 전체 박스
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 5px solid black;
  width: 600px;
  height: 500px;
`;

// form csss
const Form = styled.form`
  margin: 0 auto;
`;

// input css
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 30px;
  &:focus {
    border: 3px solid #3d3d;
  }
`;

// LogInBtn css
const LogInBtn = styled.input`
  box-sizing: border-box;
  display: block;
  border: none;
  margin: 0 auto;
  width: 300px;
  height: 30px;
`;

// 깃헙 구글 로그인
const OtherLogIn = styled.button`
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 30px;
`;
// 로그인 회원가입 선택 버튼 css
const SelectSign = styled.button`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 30px;
`;

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const idRef = useRef(null);

  // email 과 password onChange
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    // console.log(value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // form onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // data 정의
      let data;
      if (newAccount) {
        //new Account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //Log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      // 조건에 맞는 data 출력
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // 회원가입 or 로그인 화면 선택
  const Sign = () => {
    setNewAccount((prev) => !prev);
  };

  //구글 & 깃헙 로그인
  const onSocailClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  // 렌더링 focus email
  useEffect(() => {
    idRef.current.focus();
  }, []);

  return (
    <Container>
      {/* 로그인 창 */}
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          ref={idRef}
        />
        {/* 패스워드 입력 */}
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {/* 로그인 회원가입 버튼 */}
        <LogInBtn type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {error}
      </Form>

      {/* 로그인 & 회원가입 버튼 */}
      <SelectSign onClick={Sign}>
        {newAccount ? "로그인" : "회원가입"}
      </SelectSign>

      {/* 깃헙 & 구글  */}
      <div>
        <OtherLogIn name="google" onClick={onSocailClick}>
          Google
        </OtherLogIn>
        <OtherLogIn name="github" onClick={onSocailClick}>
          Github
        </OtherLogIn>
      </div>
    </Container>
  );
}

export default Auth;
