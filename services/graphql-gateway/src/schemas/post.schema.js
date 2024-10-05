const { gql } = require('apollo-server');
const axios = require('axios');


// Define the schema with Post type, queries, and mutations
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Comment {
    userId: ID!
    text: String!
    createdAt: String!
  }
  
  type Post {
    userId: String!
    content: String!
    likes: [String]
    comments: [Comment]
  }
  
  type Query {
    getPosts: [Post]
    getPostsByUserId(userId: String!): [Post]
  }
  type LikeResponse {
    message: String!
  }
  type Mutation {
    createPost(userId: String!, content: String!): Post
    updatePost(id: ID!, userId: String!, content: String!): Post
    deletePost(id: ID!): String
    likePost(postId: String!, userId: String!): LikeResponse
    commentOnPost(postId: ID!, userId: String!, text: String!): Comment
  }
`;


const resolvers = {
  Query: {

    getPosts: async () => {
      try {
        const response = await axios.get('http://148.113.194.169:3001/api/posts');
        return response.data.filter(post => post.userId != null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },

    // Resolver for getting posts by userId
    getPostsByUserId: async (_, { userId }) => {
      try {
        const response = await axios.get(`http://148.113.194.169:3001/api/posts/user/${userId}`);
        
        // Map response data to conform to GraphQL schema
        return response.data.map(post => ({
          ...post,
          likes: post.likes || [], // Ensure likes is an array
          comments: post.comments || [] // Ensure comments is an array
        }));
      } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        throw new Error('Failed to fetch posts for the user');
      }
    }
  },

  Mutation: {
    // Resolver for creating a new post
    createPost: async (_, { userId, content }) => {
      try {
        const response = await axios.post('http://148.113.194.169:3001/api/posts/create', { userId, content });
        console.log(response.data.post);
        return response.data.post; // Assuming the API returns the created post
      } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
      }
    },

    // Resolver for updating a post
    updatePost: async (_, { id, userId, content }) => {
      try {
        const response = await axios.put(`http://148.113.194.169:3001/api/posts/${id}`, { userId, content });
        
        return response.data.post; // Assuming the API returns the updated post
      } catch (error) {
        console.error(`Error updating post with ID ${id}:`, error);
        throw new Error('Failed to update post');
      }
    },

    // Resolver for deleting a post
    deletePost: async (_, { id }) => {
      try {
        await axios.delete(`http://148.113.194.169:3001/api/posts/${id}`);
        return `Post with ID ${id} deleted successfully.`; // Return success message
      } catch (error) {
        console.error(`Error deleting post with ID ${id}:`, error);
        throw new Error('Failed to delete post');
      }
    },

    // Resolver for liking a post
    likePost: async (_, { postId, userId }) => {
      try {
        const response = await axios.post(`http://148.113.194.169:3001/api/posts/${postId}/like`, { userId });
        if (response.data && response.data.success) {
          return { message: "Post liked successfully." };
        } else {
          console.error(`API Response: ${JSON.stringify(response.data)}`);
          return { message: response.data.message || "Failed to like post." };
        }
      } catch (error) {
        console.error(`Error liking post with ID ${postId}:`, error);
        return { message: "Error occurred while liking the post." };
      }
    },
    

    // Resolver for commenting on a post
    commentOnPost: async (_, { postId, userId, text }) => {
      try {
        const response = await axios.post(`http://148.113.194.169:3001/api/posts/${postId}/comment`, { userId, text });
        
        
        
        // Ensure that we return the correct structure according to the API response
        if (response.data && response.data.comment) {
          const { userId: returnedUserId, text: returnedText, createdAt } = response.data.comment;
          return {
            userId: returnedUserId, // Now correctly returns the userId from the comment
            text: returnedText,
            createdAt: createdAt,
          };
        } else {
          throw new Error("Comment could not be saved.");
        }
      } catch (error) {
        console.error("Error commenting on post:", error);
        throw new Error(error.response?.data?.message || "Could not comment on the post.");
      }
    }
    
    
    
    
  }
};





module.exports = { typeDefs, resolvers };
