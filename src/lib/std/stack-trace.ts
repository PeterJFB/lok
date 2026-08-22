export const getStackTrace = () => {
  try {
    // @ts-expect-error we want to trigger ReferenceError
    nonExistentFunction();
  } catch (error) {
    if (error instanceof ReferenceError) {
      return error.stack;
    }
  }
};
