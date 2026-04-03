export type DashboardRole = "user" | "superAdmin";

export function getDashboardPathForRole(
  role: string | null | undefined
): string {
  switch (role) {
    case "superAdmin":
      return "/super/administrator";
    case "user":
    default:
      return "/";
  }
}
