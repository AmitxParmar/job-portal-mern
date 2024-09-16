import JobCard from "./JobCard";

const JobListings = () => {
  const jobs = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5 gap-3 px-4">
      {jobs.map((item) => (
        <JobCard key={item + Math.random() * 10000} name={item} />
      ))}
    </div>
  );
};

export default JobListings;
