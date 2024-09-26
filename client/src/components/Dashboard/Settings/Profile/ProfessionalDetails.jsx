import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import QuillEditor from "../../common/QuillEditor";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Eye } from "lucide-react";

const ProfessionalDetails = () => {
  const { user } = useOutletContext();
  const {
    profile: { projects, education, experience },
  } = user;
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm();

  const onSubmit = (data) => {
    window.alert(JSON.stringify(data));
    console.log(":ProfessionalDetailss experiece, edu, projects", ...data);
    setIsOpen(false);
  };

  const renderForm = () => {
    switch (activeSection) {
      case "projects":
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skills" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <QuillEditor
                      className={``}
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project URL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repository"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter repository URL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      case "education":
        return (
          <>
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter institution" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter degree" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfGraduation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Graduation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter year of graduation" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      case "experience":
        return (
          <>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter employer" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
      <Accordion
        type="single"
        collapsible
        className="px-12 border rounded-t-xl shadow-2xl "
      >
        <AccordionItem value="projects">
          <AccordionTrigger className="px-4 rounded-t-2xl bg-muted border">
            Projects
          </AccordionTrigger>
          <AccordionContent className="mt-2 gap-3 overflow grid-flow-dense bg-background">
            {projects.map((project, index) => (
              <>
                <div
                  key={index}
                  className="mb-2 bg-muted shadow-2xl border hover:bg-muted/50 py-4"
                >
                  <div className="grid grid-cols-2">
                    <div className="float-left px-4">
                      <h3 className="font-bold inline text-lg">
                        {project.title},
                      </h3>{" "}
                      <p className="italic inline">
                        {project?.skills?.map((skill, index) => (
                          <span key={index}>
                            {skill}
                            {index < project.skills.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {project?.endDate
                            ? moment(project?.endDate).format("MMMM-YYYY")
                            : "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="px-6 w-full flex items-center justify-end h-full">
                      <Eye className="" />
                    </div>
                  </div>
                </div>
              </>
            ))}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="h-14 flex justify-center rounded-b-xl bg-muted border items-center">
                  <Button
                    className="bg-black font-semibold "
                    onClick={() => setActiveSection("projects")}
                  >
                    <Plus className="mr-2" /> Project
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {renderForm()}
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{edu.institution}</h3>
                <p>{edu.degree}</p>
                <p>Year of Graduation: {edu.yearOfGraduation}</p>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveSection("education")}>
                  Add Education
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Education</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {renderForm()}
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            {experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{exp.jobTitle}</h3>
                <p>{exp.employer}</p>
                <p>Start Date: {exp.startDate}</p>
                <p>End Date: {exp.endDate}</p>
                <p>{exp.description}</p>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveSection("experience")}>
                  Add Experience
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Experience</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {renderForm()}
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfessionalDetails;
