export function getFriendlyError(error: unknown): {
  message: string;
} {
  const errorMessage =
    error instanceof Error ? error.message : String(error);

  // Clerk-specific friendly messages
  if (errorMessage.includes("Invalid identifier"))
    return { message: "No account found with that email address." };
  if (errorMessage.includes("password is incorrect"))
    return { message: "Incorrect password. Please try again." };
  if (errorMessage.includes("already exists"))
    return { message: "An account with this email already exists." };
  if (errorMessage.includes("too many"))
    return { message: "Too many attempts. Please wait a moment and try again." };

  return { message: errorMessage || "Something went wrong. Please try again." };
}
