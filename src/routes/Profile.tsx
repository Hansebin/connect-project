import { auth } from "../firebase";
import ProfileContent from "../components/content/ProfileContent";

function Profile() {
  const user = auth.currentUser;

  return (
    <>
      <ProfileContent user={user} />
    </>
  );
}

export default Profile;
