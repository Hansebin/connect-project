import { User, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { IPost } from "./Timeline";
import Post from "./Post";

interface ProfileContentProps {
  user: User | null;
}

function ProfileContent({ user }: ProfileContentProps) {
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [nameOnEdit, setNameOnEdit] = useState(false);
  const [name, setName] = useState(user?.displayName ?? "person");
  const [userPosts, setUserPosts] = useState<IPost[]>([]);

  const onClickEdit = () => {
    setName(user?.displayName ?? "person");
    setNameOnEdit((cur) => !cur);
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];

      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);

      setAvatar(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const onSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || name.trim() === "") return;

    try {
      await updateProfile(user, { displayName: name });
    } catch (error) {
      console.log(error);
    } finally {
      setNameOnEdit(false);
    }
  };

  const fetchPosts = async () => {
    const postQuery = query(
      collection(db, "post"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const { createdAt, image, post, userId, nickname, category } = doc.data();

      return {
        createdAt,
        image,
        post,
        userId,
        nickname,
        category,
        id: doc.id,
      };
    });

    setUserPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start gap-10">
      <div className="flex justify-start items-center gap-4">
        {/* 사용자 프로필 사진 */}
        <form>
          <label
            htmlFor="file"
            className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2bae66] cursor-pointer"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="user image"
                className="w-full rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-12 h-12"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={onChangeFile}
            className="hidden"
          />
        </form>
        {/* 사용자 정보 */}
        <div className="flex justify-center items-center gap-2">
          {nameOnEdit ? (
            <form
              onSubmit={onSubmitName}
              className="flex flex-col justify-start items-center gap-2"
            >
              <input
                type="text"
                value={name}
                onChange={onChangeName}
                className="w-full p-2 bg-main-green-300 rounded-md focus:outline-none"
              />
              <input
                type="submit"
                value="change name"
                className="w-full bg-main-green text-white font-semibold p-1 rounded-xl"
              />
            </form>
          ) : (
            <p className="text-xl font-semibold">{user?.displayName}</p>
          )}
          <svg
            onClick={onClickEdit}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 cursor-pointer"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </div>
      </div>
      <div className="w-full p-5 flex justify-center items-center gap-20 bg-main-green rounded-md text-white">
        <div className="flex flex-col justify-center items-center gap-1">
          <span
            onClick={fetchPosts}
            className="text-2xl font-bold cursor-pointer"
          >
            {String(userPosts.length).padStart(2, "0")}
          </span>
          <span>My Post</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 opacity-30">
          <span className="text-2xl font-bold">04</span>
          <span>Like</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 opacity-30">
          <span className="text-2xl font-bold">23</span>
          <span>Comment</span>
        </div>
      </div>
      <div className="w-full py-7 grid grid-cols-6 items-center">
        <h1 className="text-2xl text-main-black font-bold">My Post</h1>
        <div className="col-span-5 h-0.5 bg-slate-300"></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        {userPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default ProfileContent;
