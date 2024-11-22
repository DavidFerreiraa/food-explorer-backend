export const postOrdersCreate = {
    schema: {
      description: 'Create a new order for the user with the given product ID',
      tags: ['orders'],
      summary: 'Create a new order with the given details',
      params: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'The ID of the product being ordered'
          }
        }
      },
      body: {
        type: 'object',
        required: ['totalPrice', 'quantity', 'ownerId'],
        properties: {
          totalPrice: {
            type: 'number',
            format: 'float',
            description: 'The total price of the order'
          },
          quantity: {
            type: 'integer',
            description: 'The quantity of the product in the order'
          },
          ownerId: {
            type: 'string',
            description: 'The ID of the user placing the order'
          }
        }
      },
      response: {
        201: {
          description: 'Order successfully created',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the created order' },
            totalPrice: { type: 'number', format: 'float', description: 'Total price of the order' },
            quantity: { type: 'integer', description: 'Quantity of the product ordered' },
            ownerId: { type: 'string', description: 'The ID of the user who placed the order' },
            productId: { type: 'string', description: 'The ID of the product in the order' }
          }
        },
        400: {
          description: 'Bad request (invalid total price, quantity or missing fields)',
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

export const patchOrderUpdateStatus = {
    schema: {
      description: 'Update the status of an existing order',
      tags: ['orders'],
      summary: 'Update the status of an order by its ID',
      params: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The ID of the order whose status is being updated'
          }
        }
      },
      body: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: ['Pendente', 'Pago', 'Preparando', 'Entregue'],
            description: 'The new status of the order'
          }
        }
      },
      response: {
        200: {
          description: 'Order status successfully updated',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the order' },
            status: { type: 'string', description: 'The updated status of the order' },
            totalPrice: { type: 'number', format: 'float', description: 'The total price of the order' },
            quantity: { type: 'integer', description: 'Quantity of the product ordered' },
            ownerId: { type: 'string', description: 'The ID of the user who placed the order' },
            productId: { type: 'string', description: 'The ID of the product in the order' }
          }
        },
        400: {
          description: 'Bad request (invalid status)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        404: {
          description: 'Order not found (invalid order ID)',
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

export const getOrdersIndex = {
    schema: {
      description: 'Retrieve all orders for the authenticated user or all orders if the user is an admin',
      tags: ['orders'],
      summary: 'Get all orders based on the user role (user or admin)',
      response: {
        200: {
          description: 'Successfully retrieved orders',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The unique ID of the order' },
              status: { type: 'string', description: 'The status of the order' },
              totalPrice: { type: 'number', format: 'float', description: 'The total price of the order' },
              quantity: { type: 'integer', description: 'Quantity of the product ordered' },
              ownerId: { type: 'string', description: 'The ID of the user who placed the order' },
              productId: { type: 'string', description: 'The ID of the product in the order' }
            }
          }
        },
        404: {
          description: 'No orders available (either no orders for the user or no orders in the system)',
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
  
export const getOrdersShow = {
    schema: {
      description: 'Retrieve a specific order by its ID if the user is the owner',
      tags: ['orders'],
      summary: 'Get a specific order by order ID',
      params: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The ID of the order to retrieve'
          }
        }
      },
      response: {
        200: {
          description: 'Successfully retrieved the order',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the order' },
            status: { type: 'string', description: 'The status of the order' },
            totalPrice: { type: 'number', format: 'float', description: 'The total price of the order' },
            quantity: { type: 'integer', description: 'Quantity of the product ordered' },
            ownerId: { type: 'string', description: 'The ID of the user who placed the order' },
            productId: { type: 'string', description: 'The ID of the product in the order' }
          }
        },
        404: {
          description: 'Order not found (invalid order ID)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        409: {
          description: 'Unauthorized (user is not the owner of the order)',
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

export const deleteOrders = {
    schema: {
      description: 'Delete a specific order by its ID if the user is the owner',
      tags: ['orders'],
      summary: 'Delete a specific order by order ID',
      params: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The ID of the order to delete'
          }
        }
      },
      response: {
        200: {
          description: 'Successfully deleted the order',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Success message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        404: {
          description: 'Order not found (invalid order ID)',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        },
        409: {
          description: 'Unauthorized (user is not the owner of the order)',
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
  
  