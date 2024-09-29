import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  removeEducation,
  removeExperience,
  removeProject,
  updateEducation,
  updateExperience,
  updateProject,
} from "@/services/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AddItemDialog from "./UpdateItemDialog";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import UpdateItemDialog from "./UpdateItemDialog";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

// Import your API functions here

const ProfessionalDetails = () => {
  const { user, isLoading } = useOutletContext();
  const [activeSection, setActiveSection] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (data) => {
      switch (data.type) {
        case "projects":
          return removeProject(user._id, data.id);
        case "education":
          return removeEducation(user._id, data.id);
        case "experience":
          return removeExperience(user._id, data.id);
        default:
          throw new Error("Invalid section");
      }
    },
    onSuccess: (s) => {
      queryClient.invalidateQueries("user");
      window.alert("success delete", activeSection, JSON.stringify(s));
    },
    onError: (error) => {
      window.alert("Error deleting item:", activeSection, error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      switch (data.type) {
        case "projects":
          return updateProject(user._id, data._id, data.item);
        case "education":
          return updateEducation(user._id, data._id, data.item);
        case "experience":
          return updateExperience(user._id, data._id, data.item);
        default:
          throw new Error("Invalid section");
      }
    },
    onSuccess: (s) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setIsUpdateDialogOpen(false);
      window.alert(activeSection, s);
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  const handleDelete = (type, id) => {
    deleteMutation.mutate({ type, id });
    console.log({ type, id });
    window.alert("trigger handledelete type id::", type, id);
  };

  const handleUpdate = (type, id, item) => {
    updateMutation.mutate({ type, id, item });
  };

  const openUpdateDialog = (type, item) => {
    setActiveSection(type);
    setItemToUpdate(item);
    setIsUpdateDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="w-full mx-auto">
      <Accordion
        type="single"
        collapsible
        className="px-12 s rounded-t-xl space-y-2"
      >
        <AccordionItem value="projects">
          <AccordionTrigger className="px-4 rounded-t-2xl bg-muted border">
            Projects
          </AccordionTrigger>
          <AccordionContent className="mt-2 gap-3 overflow grid-flow-dense bg-background">
            <Projects
              projects={user.projects}
              onDelete={(id) => handleDelete("projects", id)}
              onUpdate={(item) => openUpdateDialog("projects", item)}
            />
            <AddItemDialog
              isOpen={isAddDialogOpen}
              setIsOpen={setIsAddDialogOpen}
              activeSection="projects"
              setActiveSection={setActiveSection}
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
              onDelete={(id) => handleDelete("education", id)}
              onUpdate={(item) => openUpdateDialog("education", item)}
            />
            <AddItemDialog
              isOpen={isAddDialogOpen}
              setIsOpen={setIsAddDialogOpen}
              activeSection="education"
              setActiveSection={setActiveSection}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="px-4 rounded-b-2xl bg-muted border">
            Experience
          </AccordionTrigger>
          <AccordionContent>
            <Experience
              experience={user.experience}
              onDelete={(id) => handleDelete("experience", id)}
              onUpdate={(item) => openUpdateDialog("experience", item)}
            />
            <AddItemDialog
              isOpen={isAddDialogOpen}
              setIsOpen={setIsAddDialogOpen}
              activeSection="experience"
              setActiveSection={setActiveSection}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <UpdateItemDialog
        isOpen={isUpdateDialogOpen}
        setIsOpen={setIsUpdateDialogOpen}
        activeSection={activeSection}
        item={itemToUpdate}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ProfessionalDetails;
