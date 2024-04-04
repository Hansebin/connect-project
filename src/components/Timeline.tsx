import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import Post from "./Post";

export interface IPost {
  nickname: string;
  image?: string;
  userId: string;
  post: string;
  createdAt: number;
  category: string;
  id: string;
}

function Timeline() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchPosts = async () => {
      const postQuery = query(
        collection(db, "post"),
        orderBy("createdAt", "desc")
      );

      unsubscribe = await onSnapshot(postQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, image, post, userId, nickname, category } =
            doc.data();

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
        setPosts(posts);
      });
    };

    fetchPosts();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="py-7 grid grid-cols-7 items-center">
        <h1 className="text-2xl text-main-black font-bold">Posts</h1>
        <div className="col-span-6 h-0.5 bg-slate-300"></div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

export default Timeline;