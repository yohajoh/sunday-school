import { User } from "@/types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-hot-toast";

const exportUsers = (filteredUsers: User[]) => {
  const doc = new jsPDF();

  doc.setFillColor(30, 30, 30);
  doc.rect(0, 0, 210, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("User Report", 10, 14);

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(12);
  doc.text("Generated Data", 10, 32);

  const tableHead = [
    [
      "Student ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role",
      "Status",
      "Church",
      "Join Date",
    ],
  ];

  const tableBody = filteredUsers.map((u) => [
    u.studentId,
    u.firstName,
    u.lastName,
    u.email,
    u.phoneNumber,
    u.role,
    u.status,
    u.church,
    u.joinDate,
  ]);

  autoTable(doc, {
    head: tableHead,
    body: tableBody,
    startY: 40,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [60, 120, 216],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 40, left: 10, right: 10 },
    didDrawPage: () => {
      const page = "Page " + doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(page, 190, 10, { align: "right" });
    },
  });

  const date = new Date().toISOString().slice(0, 10);
  doc.save("users_report_" + date + ".pdf");

  toast.success("Users exported successfully");
};

export default exportUsers;
