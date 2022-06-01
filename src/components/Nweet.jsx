import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "../myBase";

const Text = styled.h4`
  font-size: 24px;
  display: block;
  text-align: center;
  margin: 0;
  margin-top: 20px;
`;
const BtnModule = styled.div`
  display: block;
  text-align: center;
`;
const Btn = styled.button`
  display: inline-block;
  margin: auto;
  border-radius: 20px;
  width: 100px;
  padding: 5px;
`;
const EditBtn = styled.button`
  display: inline;
  margin: auto;
  border-radius: 20px;
  width: 100px;
  padding: 5px;
`;
const Input = styled.input`
  display: block;
  margin: 0 auto;
`;

function Nweet({ nweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newEdit, setNewEdit] = useState(nweetObj.text);
  // 삭제
  const DeleteClick = () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      dbService.doc(`kwitter/${nweetObj.id}`).delete();
    }
  };
  // 수정버튼
  const EditClick = () => {
    setEdit((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dbService.doc(`kwitter/${nweetObj.id}`).update({
      text: newEdit,
    });
    setEdit(false);
  };
  // 수정 상황
  const onChangeEdit = (e) => {
    const {
      target: { value },
    } = e;
    setNewEdit(value);
  };
  return (
    <div>
      {edit ? (
        <Text>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              value={newEdit}
              required
              onChange={onChangeEdit}
            />
            <EditBtn type="submit" value="수정완료">
              수정완료
            </EditBtn>
          </form>
          <EditBtn onClick={EditClick}>취소</EditBtn>
        </Text>
      ) : (
        <>
          <Text>{nweetObj.text}</Text>
          {isOwner && (
            <BtnModule>
              <Btn onClick={DeleteClick}>삭제</Btn>
              <Btn onClick={EditClick}>수정</Btn>
            </BtnModule>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet;
