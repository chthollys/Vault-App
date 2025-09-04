import prisma from "./db";

const seed = async () => {
  try {
    const result = await prisma.verificationToken.deleteMany({});
    console.log(result.count, " row has been deleted");
  } catch (err) {
    console.log(err);
  }
};

seed();
