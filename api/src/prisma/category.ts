import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define the categories to seed
  const categories = ["Bebidas", "Refeições", "Sobremesas"];

  for (const categoryName of categories) {
    // Check if the category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name: categoryName },
    });

    // Create the category only if it doesn't exist
    if (!existingCategory) {
      await prisma.category.create({
        data: { name: categoryName },
      });
      console.log(`Category "${categoryName}" created.`);
    } else {
      console.log(`Category "${categoryName}" already exists.`);
    }
  }
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
