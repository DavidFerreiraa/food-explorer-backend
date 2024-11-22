export const postProductsCreate = {
    schema: {
      description: 'Create a new product with image and details',
      tags: ['products'],
      summary: 'Create a new product by uploading an image and providing product details',
      body: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the product'
          },
          description: {
            type: 'string',
            description: 'The description of the product'
          },
          price: {
            type: 'number',
            format: 'float',
            description: 'The price of the product'
          },
          ingredients: {
            type: 'array',
            items: { type: 'string' },
            description: 'A list of ingredients for the product'
          },
          creatorId: {
            type: 'string',
            description: 'The ID of the user who is creating the product'
          },
          imageFile: {
            type: 'string',
            format: 'binary',
            description: 'The image file for the product'
          },
          categoryId: {
            type: 'string',
            description: 'The ID of the category for the product'
          }
        }
      },
      consumes: ['multipart/form-data'],
      response: {
        201: {
          description: 'Product successfully created',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the created product' },
            title: { type: 'string', description: 'The title of the product' },
            description: { type: 'string', description: 'The description of the product' },
            price: { type: 'number', format: 'float', description: 'The price of the product' },
            ingredients: {
              type: 'array',
              items: { type: 'string' },
              description: 'A list of ingredients for the product'
            },
            creatorId: { type: 'string', description: 'The ID of the user who created the product' },
            imageUrl: { type: 'string', description: 'The URL of the uploaded image' },
            categoryId: { type: 'string', description: 'The ID of the category for the product' }
          }
        },
        400: {
          description: 'Bad request (missing or invalid image)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' }
          }
        }
      }
    }
};

export const deleteProduct = {
    schema: {
      description: 'Delete a product by its ID',
      tags: ['products'],
      summary: 'Deletes the specified product and its associated image',
      params: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: {
            type: 'string',
            description: 'The unique ID of the product to be deleted'
          }
        }
      },
      body: {
        type: 'object',
        required: ['ownerId'],
        properties: {
          ownerId: {
            type: 'string',
            description: 'The ID of the user attempting to delete the product'
          }
        }
      },
      response: {
        200: {
          description: 'Product successfully deleted',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Confirmation message' }
          }
        },
        404: {
          description: 'Product not found',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        409: {
          description: 'Unauthorized action (product does not belong to the user)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' }
          }
        }
      }
    }
};

export const uploadProductImage = {
    schema: {
      description: 'Upload a new image for a product',
      tags: ['products'],
      summary: 'Upload and update the image of the specified product',
      params: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: {
            type: 'string',
            description: 'The unique ID of the product to update the image for'
          }
        }
      },
      body: {
        type: 'object',
        required: ['imageFile'],
        properties: {
          imageFile: {
            type: 'string',
            format: 'binary',
            description: 'The image file to be uploaded for the product'
          }
        }
      },
      response: {
        200: {
          description: 'Product image successfully updated',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Confirmation message' },
            updatedProduct: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'The unique ID of the updated product' },
                title: { type: 'string', description: 'Title of the product' },
                description: { type: 'string', description: 'Description of the product' },
                price: { type: 'number', format: 'float', description: 'Price of the product' },
                imageUrl: { type: 'string', description: 'Updated image URL of the product' }
              }
            }
          }
        },
        400: {
          description: 'Bad request (image is missing or invalid)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        404: {
          description: 'Product not found (invalid product ID)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' }
          }
        }
      }
    }
};
  
export const getProducts = {
    schema: {
      description: 'Retrieve a list of products, optionally filtered by a search term',
      tags: ['products'],
      summary: 'Fetch products with optional search and pagination',
      querystring: {
        type: 'object',
        properties: {
          searchTerm: {
            type: 'string',
            description: 'Search term to filter products (optional)',
          },
          limit: {
            type: 'integer',
            default: 30,
            description: 'Limit the number of products returned (optional, defaults to 30)',
          },
        },
      },
      response: {
        200: {
          description: 'List of products successfully retrieved',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The unique ID of the product' },
              title: { type: 'string', description: 'Title of the product' },
              description: { type: 'string', description: 'Description of the product' },
              price: { type: 'number', format: 'float', description: 'Price of the product' },
              imageUrl: { type: 'string', description: 'URL of the product image' },
              ingredients: { type: 'array', items: { type: 'string' }, description: 'List of ingredients for the product' },
            },
          },
        },
        404: {
          description: 'No products found matching the search criteria',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' },
          },
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
          },
        },
      },
    },
};


export const getProductById = {
    schema: {
      description: 'Retrieve a specific product by its ID',
      tags: ['products'],
      summary: 'Fetch a product by its unique ID',
      params: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'The unique ID of the product',
          },
        },
      },
      response: {
        200: {
          description: 'Product successfully retrieved',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the product' },
            title: { type: 'string', description: 'Title of the product' },
            description: { type: 'string', description: 'Description of the product' },
            price: { type: 'number', format: 'float', description: 'Price of the product' },
            imageUrl: { type: 'string', description: 'URL of the product image' },
            ingredients: { type: 'array', items: { type: 'string' }, description: 'List of ingredients for the product' },
          },
        },
        404: {
          description: 'Product not found with the given ID',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' },
          },
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
          },
        },
      },
    },
};

export const putProductUpdate = {
    schema: {
      description: 'Update an existing product by its ID',
      tags: ['products'],
      summary: 'Update the details of an existing product',
      params: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'The unique ID of the product to update',
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'The unique ID of the product to update (required)' },
          title: { type: 'string', description: 'Title of the product' },
          description: { type: 'string', description: 'Description of the product' },
          price: { type: 'number', format: 'float', description: 'Price of the product' },
          ingredients: { type: 'array', items: { type: 'string' }, description: 'List of ingredients for the product' },
          imageFile: { type: 'string', format: 'binary', description: 'New image for the product (optional)' },
          creatorId: { type: 'string', description: 'ID of the creator' },
        },
      },
      response: {
        200: {
          description: 'Product successfully updated',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the updated product' },
            title: { type: 'string', description: 'Updated title of the product' },
            description: { type: 'string', description: 'Updated description of the product' },
            price: { type: 'number', format: 'float', description: 'Updated price of the product' },
            imageUrl: { type: 'string', description: 'Updated URL of the product image' },
            ingredients: { type: 'array', items: { type: 'string' }, description: 'Updated list of ingredients' },
          },
        },
        404: {
          description: 'Product not found with the given ID',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' },
          },
        },
        default: {
          description: 'Unexpected error',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
          },
        },
      },
    },
};
  
  