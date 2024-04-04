import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function PostEditForm({
  onEdit,
  editPost,
  docId,
  endEdit,
}: {
  onEdit: boolean;
  editPost: string;
  docId: string;
  endEdit: () => void;
}) {
  const [post, setPost] = useState(editPost);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPost(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onEdit) return;

    try {
      setIsLoading(true);
      const docRef = doc(db, "post", docId);
      await updateDoc(docRef, { post: post });
      endEdit();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (onEdit) {
      setPost(editPost);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="w-full mb-5">
      <textarea
        value={post}
        onChange={onChange}
        rows={3}
        required
        className="w-full mb-2 p-5 border border-main-green rounded-lg resize-none focus:outline-0"
      />
      <input
        type="submit"
        value={isLoading ? "Editing..." : "Post Edit"}
        className="w-full p-3 text-white font-semibold bg-main-green rounded-full cursor-pointer hover:bg-main-green-800 ease-in-out duration-500"
      />
    </form>
  );
}

export default PostEditForm;
