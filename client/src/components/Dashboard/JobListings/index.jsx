import { useQuery, useQueryClient } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { fetchJobs } from "@/services/JobServices";

const JobListings = () => {
  /* const jobs = [
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
 */
  const queryClient = useQueryClient();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  console.log(data);
  if (isLoading) return <>Loading</>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5 gap-3 px-4">
      {data ? (
        data?.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default JobListings;
