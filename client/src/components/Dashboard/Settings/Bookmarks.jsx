import { Briefcase, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BookmarkButton from "../JobListings/BookmarkButton";
import Container from "../common/Container";
import { formatSalary } from "@/lib/utils";
import { useOutletContext } from "react-router-dom";

const Bookmarks = () => {
  const { user, isLoading } = useOutletContext();
  if (isLoading) return <div>sldknasdn</div>;
  console.log("bookmarks", user?.salaryRange?.min, user?.bookmarkedJobs);
  return (
    <Container
      className={`max-w-screen-2xl capitalize font-semibold w-screen px-20  mx-6 py-12 `}
    >
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">
          Bookmarked Jobs ({user?.bookmarkedJobs?.length})
        </h1>
        <div className="space-y-4">
          {user?.bookmarkedJobs?.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job?.title}</CardTitle>
                    <CardDescription>{job?.company}</CardDescription>
                  </div>
                  <div className="h-12 border rounded-full w-12">
                    <BookmarkButton jobId={job?._id} isBookmarked />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between text-sm">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job?.location?.city}</span>
                  </div>
                  <div className="font-bold h-fit text-gray-700">
                    <Briefcase />
                    {formatSalary(job?.salaryRange?.min)} -{" "}
                    {formatSalary(job?.salaryRange?.max)} /{" "}
                    {job?.frequency || "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {user?.bookmarkedJobs?.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No bookmarked jobs. Start saving jobs you&apos;re interested in!
          </p>
        )}
      </div>
    </Container>
  );
};

export default Bookmarks;
