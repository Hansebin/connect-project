import { useNavigate } from "react-router-dom";
import * as screen from "./styled-components/component";

function NotFound() {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate("/");
  };

  return (
    <>
      <screen.Wrapper>
        <div>
          <screen.MainText>This page does not exist.</screen.MainText>
          <screen.Text>Click the button below to go to the home.</screen.Text>
        </div>
        <screen.Btn onClick={onClickBtn}>Go Home</screen.Btn>
      </screen.Wrapper>
    </>
  );
}

export default NotFound;
