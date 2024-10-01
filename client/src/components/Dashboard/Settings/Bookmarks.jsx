import Container from "../common/Container";
import { useOutletContext } from "react-router-dom";

const Bookmarks = () => {
  const { user, isLoading } = useOutletContext();
  if (isLoading) <div>sldknasdn</div>;
  console.log("bookmarks", user?.bookmarkedJobs);
  return (
    <Container
      className={`max-w-screen-2xl font-semibold w-screen px-20  mx-6 py-12 `}
    >
      {JSON.stringify(user?.bookmarkedJobs)}
    </Container>
  );
};

export default Bookmarks;
