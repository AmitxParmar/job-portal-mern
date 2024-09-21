import Container from "../common/Container";
import JobListings from "../JobListings";

const Bookmarks = () => {
  return (
    <Container
      className={`max-w-screen-2xl font-semibold w-screen px-20  mx-6 py-12 `}
    >
      <div className="">
        <JobListings />
      </div>
    </Container>
  );
};

export default Bookmarks;
