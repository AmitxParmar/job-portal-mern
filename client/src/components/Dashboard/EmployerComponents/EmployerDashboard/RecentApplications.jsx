import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types";

const RecentApplications = ({ recentApplications, onSelectApplicant }) => {
  return (
    <Card className="rounded-3xl shadow-xl">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Latest candidate applications</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-flow-row-dense gap-2">
          {recentApplications.map((app) => (
            <li
              key={app._id}
              className="flex bg-muted rounded-3xl py-4 px-6 border items-center justify-between hover:bg-muted/50"
              onClick={() => onSelectApplicant(app.applicant._id)}
            >
              <div>
                <p className="font-medium">{app.applicant.fullName}</p>
                <p className="text-sm text-muted-foreground">{app.job.title}</p>
                <p className="text-sm text-muted-foreground">
                  Applied: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={
                  app.status === "applied"
                    ? "default"
                    : app.status === "reviewing"
                    ? "secondary"
                    : "outline"
                }
              >
                {app.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

RecentApplications.propTypes = {
  onSelectApplicant: PropTypes.func,
  recentApplications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      applicant: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
      }).isRequired,
      job: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      appliedAt: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentApplications;
