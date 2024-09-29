import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const Experience = ({ experience, onDelete, onUpdate }) => {
  return (
    <>
      {experience?.map((exp) => (
        <div
          key={exp._id}
          className="mb-2 bg-muted shadow-2xl border hover:bg-muted/50 py-4"
        >
          <div className="grid grid-cols-2">
            <div className="float-left px-4">
              <h3 className="font-bold">{exp?.jobTitle}</h3>
              <p>{exp?.employer}</p>
              <p>Start Date: {exp?.startDate}</p>
              <p>End Date: {exp?.endDate}</p>
              <p>{exp?.description}</p>
            </div>
            <div className="px-6 w-full flex items-center justify-end h-full">
              <Button variant="ghost" size="icon" onClick={() => onUpdate(exp)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(exp._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      employer: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Experience;