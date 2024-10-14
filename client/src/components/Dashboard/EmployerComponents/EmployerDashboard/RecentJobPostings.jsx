import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";

const RecentJobPostings = ({ recentJobs }) => {
  return (
    <Card className="rounded-3xl shadow-xl">
      <CardHeader>
        <CardTitle>Recent Job Postings</CardTitle>
        <CardDescription>Overview of your latest job listings</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-flow-row-dense gap-2">
          {recentJobs?.map((job) => (
            <li
              key={job._id}
              className="flex bg-muted rounded-3xl py-4 px-6 border items-center justify-between"
            >
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">
                  {job.company.name} - {job.location.city},{" "}
                  {job.location.country}
                </p>
                <p className="text-sm text-muted-foreground">
                  {job.applicants.length} applicant(s)
                </p>
              </div>
              <Badge variant="default">Open</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

RecentJobPostings.propTypes = {
  recentJobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      applicants: PropTypes.arrayOf(PropTypes.string).isRequired,
      postedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentJobPostings;
