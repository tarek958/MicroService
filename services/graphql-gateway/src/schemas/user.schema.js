const { gql } = require('apollo-server');
const axios = require('axios'); 
const typeDefs = gql`
  type User {
    _id: ID!
    id: ID!
    email: String!
    username: String!
    password: String!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    register(email: String!, username: String!, password: String!, userType: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUser(id: ID!, email: String, username: String, password: String): User
    deleteUser(id: ID!): String
  }
`;
const resolvers = {
  Query: {
    // Fetch a single user by ID
    getUser: async (_, { id }) => {
      try {
        const response = await axios.get(`http://148.113.194.169:3000/api/users/${id}`);
        return response.data.user;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },

    // Fetch all users
    getAllUsers: async () => {
      try {
        const response = await axios.get('http://148.113.194.169:3000/api/users/all');
        console.log("I'm here");
        return response.data.users; // Assuming the response is an array of users
      } catch (error) {
        throw new Error('Failed to fetch all users');
      }
    }
  },

  Mutation: {
    // Register a new user
    register: async (_, { email, username, password }) => {
      try {
        const response = await axios.post('http://148.113.194.169:3000/api/users/register', {
          email,
          username,
          password,
          userType: 'user' 
        });
        
        return {
          user: response.data.user,
          token: response.data.token // Assuming your API returns a token on registration
        };
      } catch (error) {
        throw new Error('Registration failed');
      }
    },

    // Login user
    login: async (_, { email, password }) => {
      try {
        const response = await axios.post('http://148.113.194.169:3000/api/users/login', {
          email,
          password
        });
        return {
          user: response.data.user,
          token: response.data.token
        };
      } catch (error) {
        throw new Error('Login failed');
      }
    },

    // Update user information
    updateUser: async (_, { id, email, username, password }) => {
      try {
        const updatedData = {
          ...(email && { email }),
          ...(username && { username }),
          ...(password && { password })
        };

        const response = await axios.put(`http://148.113.194.169:3000/api/users/${id}`, updatedData);
        return response.data.user;
      } catch (error) {
        throw new Error('Failed to update user');
      }
    },

    // Delete user
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(`http://148.113.194.169:3000/api/users/${id}`);
        return 'User deleted successfully';
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    }
  }
};

module.exports = { typeDefs, resolvers };

