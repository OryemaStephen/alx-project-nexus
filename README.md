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

## 📱 App Usage

🔗 **Live App:** [mysocial256.vercel.app](https://mysocial256.vercel.app)  

The application works as a **social media platform** where users can:  

1. **Register & Login** – Create an account or log in securely.  
2. **Access the Dashboard** – Land on a personalized dashboard with a live feed.  
3. **Browse Posts** – View a dynamic social feed loaded in real-time.  
4. **Engage with Content**:  
   - 👍 **Like Posts** with instant updates.  
   - 💬 **Comment** on posts and view threaded discussions.  
   - 🔄 **Share** posts with custom messages.  
5. **Stay Logged In or Logout** – Sessions are maintained until the user decides to log out.  


---

## ⚡ Challenges & Solutions
**Challenge:** Styling consistency in large projects  
**Solution:** Implemented TailwindCSS themes and reusable component.  

**Challenge:** Performance bottlenecks and debugging  
**Solution:** Applied Lighthouse audits, and code-splitting.  

---

## 🤝 API & Backend Integration

This section outlines the **GraphQL API endpoints** and **data structures** required for successful integration with the backend.  
They cover the **core features of the dynamic social media feed**: posts, likes, comments, shares, users, and pagination.  

### 🔗 Key Endpoints

#### 📌 Posts
- **Query:** `getPosts`  
  - Fetches a list of posts for the main feed.  
  - Args: `first: Int`, `after: String`  
  - Returns: `PostConnection`  

- **Query:** `getPostById`  
  - Fetch a single post with details (likes, comments, author).  
  - Args: `id: ID!`  

#### ❤️ Likes
- **Mutation:** `likePost` → Allows a user to like a post.  
- **Mutation:** `unlikePost` → Removes a like.  

#### 💬 Comments
- **Query:** `getComments` → Fetch comments for a post.  
- **Mutation:** `addComment` → Adds a comment.  
- **Mutation:** `deleteComment` → Deletes a comment.  

#### 🔄 Shares
- **Mutation:** `sharePost` → Share a post with an optional message.  

#### 👤 Users
- **Query:** `getUserProfile` → Fetch a user’s profile and posts.  
- **Query:** `getUserFeed` → Fetch posts by a specific user.  

---

### 📐 Data Models (Schemas)

**Post Object**
```graphql
type Post {
  id: ID!
  author: User!
  content: String!
  image: String
  createdAt: String!
  likeCount: Int!
  commentCount: Int!
  shareCount: Int!
  isLiked: Boolean!
  comments(first: Int, after: String): CommentConnection
}
