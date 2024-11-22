export const postUserSchema = {
    schema: {
      description: 'Create a new user in the database',
      tags: ['user'],
      summary: 'Create a new user',
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { 
            type: 'string',
            description: 'The name of the user'
          },
          email: { 
            type: 'string',
            format: 'email',
            description: 'The email address of the user'
          },
          password: { 
            type: 'string',
            minLength: 6,
            description: 'The password for the user (at least 6 characters)'
          }
        }
      },
      response: {
        201: {
        },
        409: {
          description: 'Conflict error (e.g., email already in use or invalid data)',
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
            message: { type: 'string', description: 'Error message' },
            statusCode: { type: 'integer', description: 'HTTP status code' }
          }
        }
      }
    }
}
  