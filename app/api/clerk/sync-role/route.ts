import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { targetUserId, role } = body;

    if (!targetUserId || !role) {
      return NextResponse.json(
        { error: "Missing targetUserId or role" },
        { status: 400 }
      );
    }

    // Users can only sync their own role
    if (userId !== targetUserId) {
      return NextResponse.json(
        { error: "Forbidden: can only sync your own role" },
        { status: 403 }
      );
    }

    const validRoles = ["user", "superAdmin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to sync role to Clerk:", error);
    return NextResponse.json(
      { error: "Failed to sync role" },
      { status: 500 }
    );
  }
}
