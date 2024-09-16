import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "../common/Container";

const invoices = [
  // Renamed to applications
  {
    logo: "CompanyA.png", // Added logo
    applyFor: "Software Engineer", // Added applyFor
    jobType: "Full-time", // Added jobType
    status: "Applied", // Changed paymentStatus to status
    apply: "2023-10-01", // Added apply date
  },
  {
    logo: "CompanyB.png",
    applyFor: "Product Manager",
    jobType: "Full-time", // Added jobType
    status: "Interviewing",
    apply: "2023-09-15",
  },
  {
    logo: "CompanyC.png",
    applyFor: "Data Scientist",
    jobType: "Contract", // Added jobType
    status: "Rejected",
    apply: "2023-08-20",
  },
  {
    logo: "CompanyD.png",
    applyFor: "UX Designer",
    jobType: "Part-time", // Added jobType
    status: "Reviewing",
    apply: "2023-10-05",
  },
  {
    logo: "CompanyE.png",
    applyFor: "DevOps Engineer",
    jobType: "Full-time", // Added jobType
    status: "Applied",
    apply: "2023-09-30",
  },
  {
    logo: "CompanyF.png",
    applyFor: "Frontend Developer",
    jobType: "Internship", // Added jobType
    status: "Hired",
    apply: "2023-10-10",
  },
  {
    logo: "CompanyG.png",
    applyFor: "Backend Developer",
    jobType: "Full-time", // Added jobType
    status: "Interviewing",
    apply: "2023-09-25",
  },
];
const statusClasses = {
  applied: "bg-applied",
  reviewing: "bg-reviewing",
  interviewing: "bg-interview",
  hired: "bg-hired",
  rejected: "bg-rejected",
};

export default function TableDemo() {
  return (
    <Container
      className={`max-w-screen-2xl font-semibold w-screen px-3 mx-6 py-12 `}
    >
      <Table>
        <TableCaption>A list of your recently applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Apply For</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Apply Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.logo}>
              {" "}
              <TableCell className="font-medium">
                <img
                  src={invoice.logo}
                  alt={invoice.applyFor}
                  className="w-10 h-10"
                />{" "}
              </TableCell>
              <TableCell>{invoice.applyFor}</TableCell>
              <TableCell>{invoice.jobType}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full font-semibold text-white text-center px-4 py-2 tracking-wide border ${
                    statusClasses[invoice.status.toLowerCase()]
                  }`}
                >
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{invoice.apply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
