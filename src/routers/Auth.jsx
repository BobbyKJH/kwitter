import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../myBase";

const Container = styled.div`
  display: block;
  margin: 0 auto;
  border: 5px solid black;
  width: 600px;
  height: 500px;
`;

// form style
const Form = styled.form`
  margin: 0 auto;
`;

// input style
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 30px;
`;

// LogInBtn
const LogInBtn = styled.input`
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 30px;
`;

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
  const [error, setError] = useState("  ");

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

  const Cotainer = styled.div`
    display: block;
    width: 600px;
    height: 700px;
  `;

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

  const Sign = () => {
    setNewAccount((prev) => !prev);
  };

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
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <LogInBtn type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {error}
        <SelectSign onClick={Sign}>
          {newAccount ? "로그인 하러 가기" : "회원가입"}
        </SelectSign>
      </Form>
    </Container>
  );
}

export default Auth;
