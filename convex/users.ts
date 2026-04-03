import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_authUserId", (q) => q.eq("authUserId", identity.subject))
      .unique();

    return user;
  },
});

export const syncUser = mutation({
  args: {
    authUserId: v.string(),
    email: v.string(),
    fullName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    if (identity.subject !== args.authUserId) {
      throw new Error("Not authorized");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_authUserId", (q) => q.eq("authUserId", args.authUserId))
      .unique();

    if (existingUser) {
      if (
        existingUser.email !== args.email ||
        existingUser.fullName !== args.fullName
      ) {
        await ctx.db.patch(existingUser._id, {
          email: args.email,
          fullName: args.fullName,
        });
      }
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      authUserId: args.authUserId,
      email: args.email,
      fullName: args.fullName,
      role: "user",
      profileComplete: false,
    });

    return userId;
  },
});
