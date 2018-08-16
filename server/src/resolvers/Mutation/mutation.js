var mutation = {
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createUser(
        {
          data: {
            username: args.name,
            password: args.password
          },
        },
        info,
      )
    }
  }

  module.exports = mutation