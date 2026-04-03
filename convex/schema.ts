import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authUserId: v.string(),
    email: v.string(),
    fullName: v.string(),
    role: v.union(
      v.literal("user"),
      v.literal("superAdmin")
    ),
    profileComplete: v.boolean(),
    status: v.optional(v.union(v.literal("active"), v.literal("blocked"))),
  }).index("by_authUserId", ["authUserId"]),
});
