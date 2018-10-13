const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user auth-ed
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // Take a copy of updated fields
    const updates = { ...args };
    // Remove ID from the updates
    delete updates.id;
    // Run update method
    return ctx.db.mutation.updateItem(
      { data: { ...updates }, where: { id: args.id } },
      info
    );
  }
};

module.exports = Mutations;
