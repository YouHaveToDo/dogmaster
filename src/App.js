import React from "react";
import styled from "styled-components";
import apis from "./apis";
function App() {
  const [list, setList] = React.useState();
  const [rest, setRest] = React.useState([]);
  apis
    .callData()
    .then((response) => {
      console.log(response);
      setList(response.data.list);
      console.log(list);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <Liner>
        <Items>
          {list
            ? list.map((el, idx) => {
                return (
                  <Item>
                    <h3>{el.title}</h3>
                    <p>{el.contents}</p>
                    <img src={el.image} alt="" />
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
