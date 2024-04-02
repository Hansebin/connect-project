import { useNavigate } from "react-router-dom";
import * as screen from "./styled-components/component";

function NotYet() {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center">
          <screen.MainText>Preparing for service...</screen.MainText>
          <screen.Text>Click the button below to go to the home.</screen.Text>
        </div>
        <screen.Btn onClick={onClickBtn}>Go Home</screen.Btn>
      </div>
    </>
  );
}

export default NotYet;
