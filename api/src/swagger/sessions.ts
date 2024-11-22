export const postSessionsCreate = {
    schema: {
      description: 'Authenticate a user and return a JWT token and refresh token',
      tags: ['session'],
      summary: 'User login session',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'The email address of the user'
          },
          password: {
            type: 'string',
            description: 'The password of the user'
          }
        }
      },
      response: {
        201: {
          description: 'Successful authentication',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The unique ID of the authenticated user' },
            name: { type: 'string', description: 'The name of the authenticated user' },
            email: { type: 'string', description: 'The email of the authenticated user' },
            Role: { type: 'string', description: 'The role of the user' },
            avatarURL: { type: 'string', description: 'The future URL of the avatar'},
            createdAt: { type: 'string', format: 'date-time', description: 'The date and time when the user was created' },
            updatedAt: { type: 'string', format: 'date-time', description: 'The date and time when the user was updated' },
            refreshToken: { type: 'string', description: 'The refresh token for the user' }
          },
          headers: {
            'Set-Cookie': {
              type: 'string',
              description: 'Cookies containing the JWT and refresh token'
            }
          }
        },
        401: {
          description: 'Authentication failed (invalid email or password)',
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
  