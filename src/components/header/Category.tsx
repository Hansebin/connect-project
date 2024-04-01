import { Link } from "react-router-dom";
import styled from "styled-components";

const List = styled.li`
  padding: 5px 20px;

  font-size: 13px;
  font-weight: 700;

  background-color: white;
  border-radius: 50px;

  transition: all 0.8s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2bae66;
    color: white;
  }
`;

const categories = [
  { path: "/hot", title: "HOT" },
  { path: "/", title: "K-POP" },
  { path: "/movie-drama", title: "Movie / Drama" },
  { path: "/sport", title: "Sport" },
];

function Category() {
  return (
    <div className="h-12 bg-[#2bae6630]">
      <ul className="h-full flex justify-center items-center gap-10">
        {categories.map((category) => (
          <List key={category.title}>
            <Link to={category.path}>{category.title}</Link>
          </List>
        ))}
      </ul>
    </div>
  );
}

export default Category;
