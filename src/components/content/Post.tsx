import { Link } from "react-router-dom";
import { IPost } from "./Timeline";
import { auth, db, storage } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import PostEditForm from "./PostEditForm";

// 포스트 작성 날짜 추가

function Post({ nickname, category, post, image, userId, id }: IPost) {
  const [edit, setEdit] = useState(false);
  const [, setEditPost] = useState(post);
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete the post?");

    if (!ok || user?.uid !== userId) return;

    try {
      await deleteDoc(doc(db, "post", id));

      if (image) {
        const imageRef = ref(storage, `post/${user.uid}/${id}`);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    setEditPost(post);
    setEdit((cur) => !cur);
  };

  const endEdit = () => {
    setEdit(false);
  };

  return (
    <div className="w-full p-7 grid grid-cols-3 gap-5 items-center shadow-basic rounded-md">
      <div className="col-span-2 w-full grid grid-rows-5 gap-2 justify-start items-start">
        <div className="row-span-1 w-full flex items-center gap-7">
          <div className="flex justify-center items-center gap-1">
            <Link
              to="/profile"
              className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2bae66]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <p className="text-sm text-main-black font-semibold">{nickname}</p>
          </div>
          {userId === user?.uid ? (
            <div className="flex justify-center items-center gap-1">
              <button
                onClick={onDelete}
                className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer transition duration-500 ease-in-out hover:bg-main-green hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={onEdit}
                className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer transition duration-500 ease-in-out hover:bg-main-green hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        <div className="row-span-3 h-full w-full flex flex-col justify-center">
          {edit ? (
            <PostEditForm
              onEdit={edit}
              editPost={post}
              docId={id}
              endEdit={() => {
                endEdit();
              }}
            />
          ) : (
            <p className="text-lg text-main-black font-medium">{post}</p>
          )}
        </div>
        <div className="row-span-1 w-full flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <p className="px-3 py-1 ml-4 bg-main-green-800 text-sm text-white font-semibold rounded-3xl">{`# ${category}`}</p>
        </div>
      </div>
      {image ? (
        <div className="w-[180px]">
          <img src={image} alt="post image" className="w-full" />
        </div>
      ) : null}
    </div>
  );
}

export default Post;
