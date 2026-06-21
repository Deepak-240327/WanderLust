<h1 align="center">
  🌍 WanderLust
</h1>

<p align="center">
  <b>Discover & Share Amazing Travel Destinations</b><br/>
  A full-stack travel listing platform inspired by Airbnb — where wanderers become hosts.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-Image%20CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
</p>

---

## ✨ Features

- 🏠 **Browse Listings** — Explore travel destinations posted by the community
- ➕ **Create Listings** — Add your own place with title, description, price, location & photo
- ✏️ **Edit & Delete** — Full ownership control over your listings
- ⭐ **Reviews & Ratings** — Leave reviews (1–5 stars) on any listing
- 🔐 **Authentication** — Secure signup/login with Passport.js (local strategy)
- 🛡️ **Authorization** — Only owners can edit/delete their listings; only authors can delete reviews
- 📸 **Image Uploads** — Photos stored on Cloudinary CDN
- 💾 **Persistent Sessions** — Sessions stored in MongoDB (no data loss on server restart)
- 🔔 **Flash Messages** — Instant feedback for every user action

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 22 |
| **Framework** | Express.js 5 |
| **Templating** | EJS + EJS-Mate (layouts) |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | Passport.js + passport-local-mongoose |
| **Image Storage** | Cloudinary + multer-storage-cloudinary |
| **Session Store** | connect-mongo |
| **Validation** | Joi |
| **Deployment** | Render |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- A [Cloudinary](https://cloudinary.com/) account (free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Deepak-240327/WanderLust.git
cd WanderLust
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env   # or create it manually
```

Fill in the values:

```env
# Session secret (any long random string)
SECRET=your_super_secret_key

# Cloudinary credentials (from cloudinary.com → Dashboard)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# MongoDB Atlas connection string
ATLAS_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/WanderLust?retryWrites=true&w=majority
```

> **How to get your MongoDB Atlas URL:**
> 1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com)
> 2. Click your cluster → **Connect** → **Drivers**
> 3. Copy the connection string and replace `<username>` / `<password>`
> 4. Go to **Network Access** → Add your IP address

### 4. Run Locally

```bash
npm run dev
```

The server starts at **http://localhost:8080**

---

## 📁 Project Structure

```
WanderLust/
├── Models/
│   ├── listing.js       # Listing schema (title, price, image, owner, reviews)
│   ├── review.js        # Review schema (rating, comment, author)
│   └── user.js          # User schema (passport-local-mongoose)
├── routes/
│   ├── listing.js       # CRUD routes for listings
│   ├── review.js        # Post & delete reviews
│   └── user.js          # Signup, login, logout
├── utils/
│   ├── ExpressError.js  # Custom error class
│   ├── middleware.js    # isLoggedIn, isOwner, isAuthor, saveRedirectUrl
│   └── wrapAsync.js     # Async error handler wrapper
├── views/
│   ├── layouts/         # EJS-Mate base layout
│   ├── listings/        # Index, show, new, edit, error views
│   └── users/           # Signup & login views
├── public/              # Static assets (CSS, JS, images)
├── cloudConfig.js       # Cloudinary & multer storage config
├── schema.js            # Joi validation schemas
├── app.js               # Express app entry point
└── package.json
```

---

## 🌐 Deployment on Render

This project is deployed on [Render](https://render.com). To deploy your own instance:

1. **Push your code** to a GitHub repository
2. Go to [render.com](https://render.com) → **New Web Service** → Connect your repo
3. Set the following in Render's dashboard:

   | Setting | Value |
   |---------|-------|
   | **Environment** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node app.js` |
   | **Node Version** | `22` |

4. Under **Environment Variables**, add all 5 keys from your `.env` file + `NODE_ENV=production`
5. Under **Network Access** in MongoDB Atlas, add your **Render outbound IP** (found in Render → your service → Outbound IPs)
6. Click **Deploy**

---

## 🔑 Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `SECRET` | Session encryption secret | Any random string |
| `CLOUD_NAME` | Cloudinary cloud name | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `CLOUD_API_KEY` | Cloudinary API key | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `CLOUD_API_SECRET` | Cloudinary API secret | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `ATLAS_URL` | MongoDB connection string | [cloud.mongodb.com](https://cloud.mongodb.com) → Connect |
| `NODE_ENV` | Set to `production` in prod | Manual |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start dev server with nodemon (hot reload) |

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Deepak**  
GitHub: [@Deepak-240327](https://github.com/Deepak-240327)

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ and lots of ☕</p>
