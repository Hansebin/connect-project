import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CreatePostBtn from "./CreatePostBtn";

// 이미지 용량 제한 필요

function PostForm({ category }: { category: string }) {
  const [onPost, setOnPost] = useState(false);
  const [post, setPost] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickPostBtn = () => {
    setOnPost((cur) => !cur);
  };

  const onChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPost(value);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      setImage(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (isLoading || !user || post === "") return;

    try {
      setIsLoading(true);

      const doc = await addDoc(collection(db, "post"), {
        nickname: user.displayName,
        userId: user.uid,
        post,
        createdAt: Date.now(),
        category: category,
      });

      if (image) {
        const locationRef = ref(storage, `post/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, image);
        const imgUrl = await getDownloadURL(result.ref);

        await updateDoc(doc, { image: imgUrl });
      }

      setPost("");
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <CreatePostBtn onClick={onClickPostBtn} />
      </div>
      {onPost ? (
        <form onSubmit={onSubmit} className="w-full mt-5">
          <textarea
            value={post}
            onChange={onChangePost}
            rows={5}
            maxLength={200}
            placeholder="write post ..."
            required
            className="w-full p-5 border border-main-green rounded-lg resize-none focus:outline-0"
          />
          <div className="grid grid-cols-2 gap-5 mt-5">
            <label
              htmlFor="file"
              className="w-full p-3 text-center font-semibold text-white bg-main-green rounded-full cursor-pointer hover:bg-main-green-800 ease-in-out duration-500"
            >
              {image ? "✓ image attached complete!" : "Upload Image"}
            </label>
            <input
              id="file"
              type="file"
              onChange={onChangeFile}
              accept="image/*"
              className="hidden"
            />
            <input
              type="submit"
              value={isLoading ? "Uploading..." : "Upload Post"}
              className="w-full p-3 text-white font-semibold bg-main-green rounded-full cursor-pointer hover:bg-main-green-800 ease-in-out duration-500"
            />
          </div>
        </form>
      ) : null}
    </>
  );
}

export default PostForm;
