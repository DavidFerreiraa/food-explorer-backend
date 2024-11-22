export const getProductImage = {
    schema: {
      description: 'Retrieve a product image by its URL',
      tags: ['files'],
      summary: 'Get product image by its URL',
      params: {
        type: 'object',
        properties: {
          productImageUrl: {
            type: 'string',
            description: 'The unique name or URL of the product image',
          },
        },
      },
      response: {
        200: {},
        404: {
          description: 'Product image not found',
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
  