// deno-lint-ignore-file
const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

export { errorMiddleware };
