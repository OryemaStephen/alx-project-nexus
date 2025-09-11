# 🚀 ALX Project Nexus


Welcome to **ALX Project Nexus**! 
This repository documents my major learnings from the **ProDev Frontend Engineering program**. 
It highlights key technologies, best practices, and challenges I faced while growing as a frontend engineer.


---


## 📌 Overview of the Program
The **ProDev Frontend Engineering program** is designed to equip learners with hands-on experience in modern frontend technologies. 
It emphasizes building scalable, accessible, and user-friendly applications while collaborating with backend developers for real-world projects.


---


## 🎯 Major Learnings


### 🔑 Key Technologies Covered
- **Mobile Development** – React Native & Expo 
- **Web Development** – Next.js 
- **Progressive Web Apps (PWA)** – Offline-first apps with enhanced performance 


### 💡 Important Frontend Concepts
- **Next.js** – Routing, API routes, SSR, SSG 
- **TailwindCSS** – Utility-first styling for rapid development 
- **System Design & Analysis** – Architecture, scalability, and design patterns 
- **TypeScript** – Type safety, interfaces, generics 
- **GraphQL** – Efficient and flexible data querying 
- **API Integration** – Connecting frontend with backend services 


---


## ⚡ Challenges & Solutions


**Challenge:** Complex state management across components 
**Solution:** Used React Context, Redux Toolkit, and Zustand for predictable state handling. 


**Challenge:** Styling consistency in large projects 
**Solution:** Implemented TailwindCSS themes and reusable component libraries. 


**Challenge:** Performance bottlenecks and debugging 
**Solution:** Applied React Profiler, Lighthouse audits, and code-splitting. 


---


---


## 🤝 API & Backend Integration


This section outlines the **GraphQL API endpoints** and **data structures** required for successful integration with the backend. 
They cover the **core features of the dynamic social media feed**: posts, likes, comments, shares, users, and pagination.


---


### 🔗 Key Endpoints


#### 📌 Posts
- **Query:** `getPosts`
- **Purpose:** Fetches a list of posts for the main feed.
- **Arguments:** 
 - `first: Int` → Number of posts to fetch. 
 - `after: String` → Cursor for pagination. 
- **Returns:** A `PostConnection` object with `nodes` and `pageInfo`.


- **Query:** `getPostById`
- **Purpose:** Fetch a single post with all its details (likes, comments, author, etc.).
- **Arguments:** 
 - `id: ID!` → Post ID. 


#### ❤️ Likes
- **Mutation:** `likePost`
- **Purpose:** Allows a user to like a specific post. 
- **Arguments:** 
 - `postId: ID!` 


- **Mutation:** `unlikePost`
- **Purpose:** Allows a user to remove their like. 
- **Arguments:** 
 - `postId: ID!` 


#### 💬 Comments
- **Query:** `getComments`
- **Purpose:** Fetch comments for a specific post. 
- **Arguments:** 
 - `postId: ID!` 
 - `first: Int` (optional) 
 - `after: String` (optional, for pagination) 


- **Mutation:** `addComment`
- **Purpose:** Adds a new comment to a post. 
- **Arguments:** 
 - `postId: ID!` 
 - `content: String!` 


- **Mutation:** `deleteComment`
- **Purpose:** Deletes a user’s comment. 
- **Arguments:** 
 - `commentId: ID!` 


#### 🔄 Shares
- **Mutation:** `sharePost`
- **Purpose:** Allows users to share a post with an optional message. 
- **Arguments:** 
 - `postId: ID!` 
 - `message: String` (optional) 


#### 👤 Users
- **Query:** `getUserProfile`
- **Purpose:** Fetch a user’s profile and their posts. 
- **Arguments:** 
 - `id: ID!` 


- **Query:** `getUserFeed`
- **Purpose:** Fetch posts created by a specific user. 
- **Arguments:** 
 - `userId: ID!` 
 - `first: Int` 
 - `after: String` 


---


### 📐 Data Models (Schemas)


**Post Object**
```graphql
type Post {
 id: ID!
 author: User!
 content: String!
 imageUrl: String
 createdAt: String!
 likeCount: Int!
 commentCount: Int!
 shareCount: Int!
 isLiked: Boolean!
 comments(first: Int, after: String): CommentConnection
}