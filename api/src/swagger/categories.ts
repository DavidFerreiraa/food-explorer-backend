export const postCategoriesCreate = {
    schema: {
      description: 'Create a new category in the database (admin only)',
      tags: ['category'],
      summary: 'Create a new category (admin only)',
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the category to be created'
          }
        }
      },
      response: {
        201: {
          description: 'Category successfully created',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the created category' },
            name: { type: 'string', description: 'The name of the created category' },
          }
        },
        401: {
          description: 'Unauthorized (admin access required)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        409: {
          description: 'Conflict error (e.g., category name already exists)',
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
}

export const getCategoriesIndex = {
    schema: {
      description: 'Retrieve all categories from the database',
      tags: ['category'],
      summary: 'Get all categories',
      response: {
        200: {
          description: 'List of all categories',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The unique ID of the category' },
              name: { type: 'string', description: 'The name of the category' },
              Products: { type: 'array', description: 'An array of the products that\'s in this category' }
            }
          }
        },
        401: {
          description: 'Unauthorized (invalid or missing JWT token in cookies)',
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
}
  
    