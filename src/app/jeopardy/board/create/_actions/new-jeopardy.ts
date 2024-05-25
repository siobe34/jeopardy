"use server";

export const createJeopardyBoard = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData.entries());
};
