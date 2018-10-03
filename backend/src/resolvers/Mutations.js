const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user auth-ed

    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);

    return item;
  }
};

module.exports = Mutations;
