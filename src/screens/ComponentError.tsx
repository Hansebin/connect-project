import * as screen from "../assets/screen-component";

function ComponentError() {
  return (
    <>
      <screen.Wrapper>
        <screen.MainText>I'm sorry.</screen.MainText>
        <screen.Text>An error occurred on that page.</screen.Text>
      </screen.Wrapper>
    </>
  );
}

export default ComponentError;
