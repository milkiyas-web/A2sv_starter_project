export type NavLinks = {
  name: string;
  href: string;
  requires?: string[];
};

export const adminLinks: NavLinks[] = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Users", href: "/dashboard/admin/users" },
  { name: "Cycles", href: "/dashboard/admin/cycles" },
  { name: "Analytics", href: "/dashboard/admin/dashboardanalytics" },
];

export const signinLinks: NavLinks[] = [
  { name: "The Journey", href: "/" },
  { name: "About", href: "/" },
  { name: "Testmonials", href: "/" },
  { name: "Create an account", href: "/auth/signup" },
];
export const signupLinks: NavLinks[] = [
  { name: "The Journey", href: "/" },
  { name: "About", href: "/" },
  { name: "Testmonials", href: "/" },
  { name: "Analytics", href: "/auth/signin-user" },
];

export const forgotPasswordLinks: NavLinks[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/" },
  { name: "Sucess Stories", href: "/" },
  { name: "Apply", href: "/dashboard/applicant" },
];

export const applicantLinks: NavLinks[] = [
  { name: "Your Profile", href: "/dashboard/profile" },
  { name: "Applicant Name", href: "" },
  { name: "Logout", href: "" },
];
