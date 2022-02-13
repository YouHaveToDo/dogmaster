import React from "react";
import styled from "styled-components";
import apis from "./apis";
function App() {
  // local 상태
  const [state, setState] = React.useState(1);
  const [num, setNum] = React.useState(0); // index 0 ~ 5 length = 6
  const [totalList, setTotalList] = React.useState([]);
  const [partList, setPartList] = React.useState();
  const [list, setList] = React.useState();
  // api call
  async function dataCall() {
    let res = await apis.callData(state);
    let resList = res.data.list;
    setTotalList([...totalList, ...resList]);
    setState(state + 1);
  }

  function partListHandler() {
    if (totalList.length >= num) {
      setPartList(
        totalList.filter((el, idx) => {
          return idx < num;
        })
      );
    } else {
      dataCall();
    }
    setNum(num + 6);
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
                    <img src={el.image} alt="" onClick={partListHandler} />
                  </Item>
                );
              })
            : null}
        </Items>
      </Liner>
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
