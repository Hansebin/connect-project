import styled from "styled-components";

const Button = styled.button`
  width: 90px;
  height: 90px;

  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #2bae66;
  border-radius: 100%;

  svg {
    fill: #2bae66;
  }
`;

function CreatePostBtn() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
        </svg>
      </Button>
      <p className="text-lg text-[#2bae66]">Creating a Post</p>
    </div>
  );
}

export default CreatePostBtn;
