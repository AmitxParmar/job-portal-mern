import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker"; // Importing the shadcn datepicker

const ProfessionalDetails = () => {
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const addExperience = (newExperience) => {
    setExperience([...experience, newExperience]);
  };

  const addEducation = (newEducation) => {
    setEducation([...education, newEducation]);
  };

  const editItem = (section, index, updatedItem) => {
    switch (section) {
      case "projects":
        setProjects(
          projects.map((item, i) => (i === index ? updatedItem : item))
        );
        break;
      case "experience":
        setExperience(
          experience.map((item, i) => (i === index ? updatedItem : item))
        );
        break;
      case "education":
        setEducation(
          education.map((item, i) => (i === index ? updatedItem : item))
        );
        break;
    }
  };

  const AddItemPopover = ({ onAdd, fields }) => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, date) => {
      setFormData({ ...formData, [name]: date });
    };

    const handleSubmit = () => {
      onAdd(formData);
      setFormData({});
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Add New</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {fields.map((field) => (
            <div key={field} className="mb-4">
              <Label htmlFor={field}>{field}</Label>
              {field === "endDate" ? (
                <DatePicker
                  id={field}
                  name={field}
                  selected={formData[field]}
                  onChange={(date) => handleDateChange(field, date)}
                />
              ) : (
                <Input
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Add</Button>
        </PopoverContent>
      </Popover>
    );
  };

  const EditItemPopover = ({ item, onEdit, fields }) => {
    const [formData, setFormData] = useState(item);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, date) => {
      setFormData({ ...formData, [name]: date });
    };

    const handleSubmit = () => {
      onEdit(formData);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Edit</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {fields.map((field) => (
            <div key={field} className="mb-4">
              <Label htmlFor={field}>{field}</Label>
              {field === "endDate" ? (
                <DatePicker
                  id={field}
                  name={field}
                  selected={formData[field]}
                  onChange={(date) => handleDateChange(field, date)}
                />
              ) : (
                <Input
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Save</Button>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="projects">
        <AccordionTrigger>Projects</AccordionTrigger>
        <AccordionContent>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3>{project.title}</h3>
              <p>Skills: {project.skills.join(", ")}</p>
              <p>End Date: {project.endDate}</p>
              <p>Description: {project.description}</p>
              <p>URL: {project.url}</p>
              <p>Repository: {project.repository}</p>
              <EditItemPopover
                item={project}
                onEdit={(updatedProject) =>
                  editItem("projects", index, updatedProject)
                }
                fields={[
                  "title",
                  "skills",
                  "endDate",
                  "description",
                  "url",
                  "repository",
                ]}
              />
            </div>
          ))}
          <AddItemPopover
            onAdd={addProject}
            fields={[
              "title",
              "skills",
              "endDate",
              "description",
              "url",
              "repository",
            ]}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience">
        <AccordionTrigger>Experience</AccordionTrigger>
        <AccordionContent>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3>{exp.jobTitle}</h3>
              <p>Employer: {exp.employer}</p>
              <p>Start Date: {exp.startDate}</p>
              <p>End Date: {exp.endDate}</p>
              <p>Description: {exp.description}</p>
              <EditItemPopover
                item={exp}
                onEdit={(updatedExp) =>
                  editItem("experience", index, updatedExp)
                }
                fields={[
                  "jobTitle",
                  "employer",
                  "startDate",
                  "endDate",
                  "description",
                ]}
              />
            </div>
          ))}
          <AddItemPopover
            onAdd={addExperience}
            fields={[
              "jobTitle",
              "employer",
              "startDate",
              "endDate",
              "description",
            ]}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3>{edu.institution}</h3>
              <p>Degree: {edu.degree}</p>
              <p>Year of Graduation: {edu.yearOfGraduation}</p>
              <EditItemPopover
                item={edu}
                onEdit={(updatedEdu) =>
                  editItem("education", index, updatedEdu)
                }
                fields={["institution", "degree", "yearOfGraduation"]}
              />
            </div>
          ))}
          <AddItemPopover
            onAdd={addEducation}
            fields={["institution", "degree", "yearOfGraduation"]}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfessionalDetails;
