import React from "react";
import styled from "styled-components";
import apis from "./apis";
function App() {
  // local 상태
  const [state, setState] = React.useState(1);
  const [num, setNum] = React.useState(0); // index 0 ~ 4 length = 5
  const [totalList, setTotalList] = React.useState([]);
  const [partList, setPartList] = React.useState();
  const [list, setList] = React.useState();

  // api call
  async function dataCall() {
    console.log(state, "state");
    let res = await apis.callData(state).catch((err) => {
      window.alert("더이상 불러올 데이터가 없습니다.");
    });
    let resList = res.data.list;
    setTotalList((prev) => [...prev, ...resList]);
    setState((prev) => prev + 1);
  }
  function remakePartList() {
    setPartList(
      totalList.filter((el, idx) => {
        return idx < num;
      })
    );
  }
  async function partListHandler() {
    console.log(totalList.length, num);
    // if (totalList.length == 0) {
    //   await dataCall();
    // }
    if (totalList.length % 10 !== 0) {
      remakePartList();
    }
    if (totalList.length >= num) {
      remakePartList();
    } else {
      await dataCall();
    }
    setNum(num + 5);
  }

  // useEffect
  React.useEffect(() => {
    dataCall();
  }, []);

  React.useEffect(() => {
    partListHandler();
  }, [totalList]);

  React.useEffect(() => {
    setList(partList);
  }, [partList]);

  // return 시작
  return (
    <>
      <Liner>
        <Items>
          {list
            ? list.map((el, idx) => {
                return (
                  <Item key={idx}>
                    <h3>{el.title}</h3>
                    <p>{el.contents}</p>
                    <img src={el.image} alt="" />
                  </Item>
                );
              })
            : null}
        </Items>
      </Liner>
      <Button onClick={partListHandler}>더보기</Button>
    </>
  );
}

export default App;

const Liner = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
const Items = styled.div``;
const Item = styled.div``;
const Button = styled.button`
  margin: 50px 0 0 150px;
`;
