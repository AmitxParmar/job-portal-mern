import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  addEducation,
  addExperience,
  addProject,
  removeEducation,
  removeExperience,
  removeProject,
  updateEducation,
  updateExperience,
  updateProject,
} from "@/services/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Education from "./Education";
import Experience from "./Experience";
import ItemDialog from "./UpdateItemDialog";
import Projects from "./Projects";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const ProfessionalDetails = () => {
  const { user, isLoading } = useOutletContext();
  const [activeSection, setActiveSection] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      const { action, type, id, item } = data;
      switch (action) {
        case "create":
          switch (type) {
            case "projects":
              return addProject(user._id, item);
            case "education":
              return addEducation(user._id, item);
            case "experience":
              return addExperience(user._id, item);
            default:
              break;
          }
          break;
        case "update":
          switch (type) {
            case "projects":
              return updateProject(user._id, id, item);
            case "education":
              return updateEducation(user._id, id, item);
            case "experience":
              return updateExperience(user._id, id, item);
            default:
              break;
          }
          break;
        case "delete":
          switch (type) {
            case "projects":
              return removeProject(user._id, id);
            case "education":
              return removeEducation(user._id, id);
            case "experience":
              return removeExperience(user._id, id);
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleAction = (action, type, id = null, item = null) => {
    mutation.mutate({ action, type, id, item });
  };

  const openDialog = (type, item = null) => {
    setActiveSection(type);
    setItemToEdit(item);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto">
      <Accordion
        type="single"
        collapsible
        className="px-12 rounded-t-xl space-y-2"
      >
        <AccordionItem value="projects">
          <AccordionTrigger className="px-4 rounded-t-2xl bg-muted border">
            Projects
          </AccordionTrigger>
          <AccordionContent className="mt-2 gap-3 overflow grid-flow-dense bg-background">
            <Projects
              projects={user.projects}
              onDelete={(id) => handleAction("delete", "projects", id)}
              onUpdate={(item) => openDialog("projects", item)}
              onAdd={() => openDialog("projects")}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="px-4 bg-muted border">
            Education
          </AccordionTrigger>
          <AccordionContent>
            <Education
              education={user.education}
              onDelete={(id) => handleAction("delete", "education", id)}
              onUpdate={(item) => openDialog("education", item)}
              onAdd={() => openDialog("education")}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="px-4 rounded--2xl bg-muted border">
            Experience
          </AccordionTrigger>
          <AccordionContent>
            <Experience
              experience={user.experience}
              onDelete={(id) => handleAction("delete", "experience", id)}
              onUpdate={(item) => openDialog("experience", item)}
              onAdd={() => openDialog("experience")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ItemDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        activeSection={activeSection}
        item={itemToEdit}
        onSubmit={(item) =>
          handleAction(
            itemToEdit ? "update" : "create",
            activeSection,
            itemToEdit?._id,
            item
          )
        }
      />
    </div>
  );
};

export default ProfessionalDetails;
