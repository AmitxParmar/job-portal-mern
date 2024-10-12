import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserRoundPlus,
  Loader2,
  ArrowLeft,
  Home,
  NotepadText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PostAJobButton from "../../EmployerComponents/PostAJobButton";
import { profileMenu } from "@/constants/constants.jsx";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Added missing imports

import { useState } from "react";
import { generateInviteCode } from "@/services/invitecodeServices";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy } from "lucide-react";

const SettingsSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isRecruiter = user?.role === "recruiter";
  const isSettingsPage = location.pathname.startsWith("/dashboard/settings");
  const isRecruiterDashboard = location.pathname.startsWith(
    "/dashboard/recruiter"
  );

  const renderBackButton = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="outline"
        onClick={() => navigate(`/dashboard/${user?.role}`)}
        className="group transition-all flex items-center justify-center w-full px-4 py-2 text-center border rounded-full hover:bg-white hover:invert"
      >
        <ArrowLeft
          className="transition-all duration-500 ease-in-out group-hover:-translate-x-2"
          size={30}
        />
        <span className="ml-2">Back</span>
      </Button>
    </motion.div>
  );

  const renderNavLink = (to, icon, label) => {
    const isActive = location.pathname === to;
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        key={to}
      >
        <Link
          to={to}
          className={`flex items-center justify-center w-full px-4 py-2 text-s border rounded-full transition-all ${
            isActive ? "bg-cyan-400/20" : "bg-white"
          }`}
        >
          <span className="mr-2">{icon}</span>
          <span>{label}</span>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {isSettingsPage
        ? renderBackButton()
        : isRecruiterDashboard && <PostAJobButton />}

      <div className="flex flex-col space-y-2 py-6 px-2 font-semibold overflow-hidden rounded-xl">
        {isRecruiter && (
          <>
            {renderNavLink(`/dashboard/${user.role}`, <Home />, "Dashboard")}
            {renderNavLink(
              "/dashboard/recruiter/job-openings",
              <NotepadText />,
              "Job Postings"
            )}
          </>
        )}

        {profileMenu.map((item) =>
          renderNavLink(item.path, item.icon, item.name)
        )}
        <InviteCodeGenerator />
      </div>
    </div>
  );
};

export default SettingsSidebar;

export function InviteCodeGenerator() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("jobSeeker");
  const [inviteCode, setInviteCode] = useState(""); // State to hold the generated invite code

  const { mutate: generateCode, isLoading } = useMutation({
    mutationFn: generateInviteCode,
    onSuccess: (data) => {
      // Receive data on success
      toast.success("Invite code generated successfully!", {
        description: `An invite code has been sent to ${email}.`,
      });
      setInviteCode(data.inviteCode); // Set the invite code received from the response
    },
    onError: (error) => {
      toast.error("Failed to generate invite code", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    generateCode({ email, role }); // Call the mutation with the email and role
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <UserRoundPlus />
          Generate Invite Code
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Generate Invite Code</SheetTitle>
          <SheetDescription>
            Create an invite code for a new user. The code will be sent to their
            email.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <RadioGroup value={role} onValueChange={setRole}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jobSeeker" id="jobSeeker" />
                <Label htmlFor="jobSeeker">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Invite Code"
            )}
          </Button>
        </form>
        {inviteCode && ( // Show the invite code input if it exists
          <div className="space-y-2">
            <Label>Generated Invite Code</Label>
            <div className="flex items-center">
              <Input
                type="text"
                value={inviteCode}
                readOnly
                disabled
                className="bg-gray-200" // Optional styling for the disabled input
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${
                      import.meta.env.VITE_FRONTEND_URL
                    }/register?inviteCode=${inviteCode}`
                  );
                  toast.success("Invite code copied to clipboard!");
                }}
                className="ml-2"
              >
                <Copy />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
