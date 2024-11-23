export const postFavoritesCreate = {
    schema: {
      description: 'Add a product to the user\'s favorites list',
      tags: ['favorites'],
      summary: 'Create a new favorite product for the user',
      params: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'The ID of the product to be added to the favorites'
          }
        }
      },
      response: {
        201: {
          description: 'Product successfully added to favorites',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the created favorite' },
            userId: { type: 'string', description: 'The ID of the user who added the product to favorites' },
            Product: { type: 'array', description: 'The list of all favorite products from this user' }
          }
        },
        500: {
          description: 'Internal server error (could not add product to favorites)',
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

  export const getFavoritesIndex = {
    schema: {
      description: 'Retrieve all favorite products of the user',
      tags: ['favorites'],
      summary: 'Get all favorites for the authenticated user',
      response: {
        200: {
          description: 'List of all favorite products for the user',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The unique ID of the favorite' },
              userId: { type: 'string', description: 'The ID of the user who has the favorite' },
              Product: { type: 'array', description: 'The list of all favorite products from this user' }
            }
          }
        },
        401: {
          description: 'Unauthorized (user is not authenticated)',
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
  
export const getFavoritesShow = {
    schema: {
      description: 'Retrieve a specific favorite product of the user',
      tags: ['favorites'],
      summary: 'Get a specific favorite for the authenticated user',
      params: {
        type: 'object',
        properties: {
          favoriteId: {
            type: 'string',
            description: 'The ID of the favorite product to be retrieved'
          }
        }
      },
      response: {
        200: {
          description: 'Specific favorite product returned successfully',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the favorite' },
            userId: { type: 'string', description: 'The ID of the user who has the favorite' },
            Product: { type: 'array', description: 'The list of all favorite products from this user' }
          }
        },
        400: {
          description: 'Bad request (product isn\'t a favorite)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        401: {
          description: 'Unauthorized (user is not authenticated)',
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

export const deleteFavorite = {
    schema: {
      description: 'Delete a specific favorite product of the user',
      tags: ['favorites'],
      summary: 'Delete a specific favorite for the authenticated user',
      params: {
        type: 'object',
        properties: {
          favoriteId: {
            type: 'string',
            description: 'The ID of the favorite product to be deleted'
          }
        }
      },
      response: {
        204: {
          description: 'Successfully deleted the order',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Success message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        400: {
          description: 'Bad request (favorite does not exist)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        409: {
          description: 'Conflict (unauthorized to delete the favorite)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        401: {
          description: 'Unauthorized (user is not authenticated)',
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
  
