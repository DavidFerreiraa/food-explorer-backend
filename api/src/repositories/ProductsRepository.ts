import { Prisma, Product } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createProductImageParams } from "../../utils/ZodTemplates";
import { IProduct } from "../interfaces/IProduct";

export class ProductsRepository {
    async index(ingredients: string = "", productName: string = "", limit: number = 5): Promise<Product[] | null> {
        const filteredIngredients = ingredients?.split(",").filter((ingredient) => ingredient.trim());
        console.log(filteredIngredients);

        if(filteredIngredients.length === 0 && productName.length === 0) {
            const products = await prisma.product.findMany({
                take: limit
            })

            return products;
        }

        if(filteredIngredients.length === 0){
            const products = await prisma.product.findMany({
                where: {
                    title: {
                        contains: `${productName}%`
                    }
                },
                take: limit
            })
    
            return products;
        }

        if(productName.length === 0){
            const products = await prisma.product.findMany({
                where: {
                    Ingredients: {
                        some: {
                            name: {
                                in: filteredIngredients
                            }
                        }
                    },
                },
                take: limit
            })
    
            return products;
        }

        const products = await prisma.product.findMany({
            where: {
                Ingredients: {
                    some: {
                        name: {
                            in: filteredIngredients
                        }
                    }
                },
                title: {
                    contains: `${productName}%`
                }
            },
            take: limit
        })

        return products;
    }

    async findById(id: string): Promise<Prisma.ProductGetPayload<{
        include: {
            Ingredients: true;
            Categories: true;
        }
    }> | null> {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                Ingredients: true,
                Categories: true
            }
        })

        return product;
    }

    async create({title, description, price, ingredients, creatorId}: IProduct, categoryId: string, imageUrl: string): Promise<Product | null> {
        const data = ingredients.map(ingredient => ({
            name: ingredient
        }));
        
        const createdProduct = await prisma.product.create({data: {
            title,
            description,
            price,
            creatorId,
            imageUrl,
            Categories: {
                create: {
                    categoryId
                }
            },
            Ingredients: {
                createMany: {
                    data
                }
            }
        }})

        return createdProduct;
    }

    async updateProductImage({ productId, productImageUrl }: typeof createProductImageParams._type): Promise<Product | null>{
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                imageUrl: productImageUrl,
            }
        })

        return updatedProduct;
    }

    async update(
        { title, description, price, ingredients, creatorId }: Partial<IProduct>, 
        categoryId: string | undefined, 
        imageUrl: string | undefined, 
        oldProduct: Prisma.ProductGetPayload<{ include: { Ingredients: true; Categories: true; } }>
      ): Promise<Product | null> {
        // Prepare the ingredients data to create new entries in the Ingredients table
        const ingredientsData = ingredients?.map(ingredient => ({
            name: ingredient
        })) || [];

        console.log(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ${ingredientsData[0].name}`)
    
        // Initialize the updateData object with fields that need to be updated
        const updateData: any = {};
    
        // Check if the title has changed
        if (title && title !== oldProduct.title) {
            updateData.title = title;
        }
    
        // Check if the description has changed
        if (description && description !== oldProduct.description) {
            updateData.description = description;
        }
    
        // Check if the price has changed
        if (price && price !== oldProduct.price) {
            updateData.price = price;
        }
    
        // Check if the imageUrl has changed
        if (imageUrl && imageUrl !== oldProduct.imageUrl) {
            updateData.imageUrl = imageUrl;
        }
    
        // Check if the creatorId has changed
        if (creatorId && creatorId !== oldProduct.creatorId) {
            updateData.creatorId = creatorId;
        }
    
        // Handle updating ingredients (if they are different)
        if (ingredientsData.length > 0) {
            // Add new ingredients only if they differ from the old ones
            const existingIngredientNames = oldProduct.Ingredients.map(ingredient => ingredient.name);
            const newIngredients = ingredientsData.filter(ingredient => !existingIngredientNames.includes(ingredient.name));
            // Find ingredients that have been removed (they are in oldProduct but not in ingredientsData)
            const removedIngredients = oldProduct.Ingredients.filter(ingredient => !ingredientsData.some(newIngredient => newIngredient.name === ingredient.name));
    
            if (newIngredients.length > 0) {
                updateData.Ingredients = {
                    createMany: {
                        data: newIngredients
                    }
                };
            }
            console.log(removedIngredients.map(ingredient => ingredient.name))
            if (removedIngredients.length > 0) {
                updateData.Ingredients = {
                    ...updateData.Ingredients,
                    deleteMany: {
                        // Specify the condition to delete ingredients based on their name
                        name: { 
                            in: removedIngredients.map(ingredient => ingredient.name)
                        }
                    }
                };
            }
        }
        
        // Handle category updates (disconnect from the old category, connect to the new category)
        if (categoryId && oldProduct.Categories.length > 0) {
            const oldCategoryId = oldProduct.Categories[0].categoryId;

            // If categoryId is different from the old category, disconnect the old category and connect the new one
            if (oldCategoryId !== categoryId) {
                // Perform the product update
                const updatedProduct = await prisma.product.update({
                    where: { id: oldProduct.id },
                    data: {
                        ...updateData,
                        Categories: {
                            delete: {
                                productId_categoryId: {
                                    productId: oldProduct.id,
                                    categoryId: oldCategoryId
                                }
                            },
                            create: {
                                categoryId
                            }
                        },
                    }
                });

                return updatedProduct;
            }
        }
      
        // Perform the product update only if there are fields to update
        if (Object.keys(updateData).length === 0) {
            // No fields to update, return the old product as is
            return oldProduct;
        }

        // Perform the product update
        const updatedProduct = await prisma.product.update({
            where: { id: oldProduct.id },
            data: {
                ...updateData,
            }
        });
    
        return updatedProduct;
    }

    async delete(id: string) {
        await prisma.product.delete({
            where: {
                id
            }
        })
    }
}