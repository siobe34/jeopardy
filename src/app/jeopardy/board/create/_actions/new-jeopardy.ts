"use server";

export const createJeopardyBoard = async (
  prevState: { message: string },
  formData: FormData,
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData.entries());

  return { message: "success" };
};
