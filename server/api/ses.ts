export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  //   const session = await requireUserSession(event);

  const { user } = session;

  return {
    user,
  };
});
