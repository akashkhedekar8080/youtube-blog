# 📺 YouTube Blog

A simple blogging platform where users can create, edit, and delete blog posts with images. Built using **Node.js, Express, MongoDB, and EJS**.

## 🚀 Features

- 📝 **Create, Read, Update, Delete (CRUD) Blogs**
- 📸 **Upload Cover Images**
- 👥 **User Authentication**
- 💬 **Comments on Blogs**
- 🎨 **Bootstrap for Styling**
- 🗄 **MongoDB for Data Storage**

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript), Bootstrap
- **File Upload**: `multer`
- **Authentication**: `passport.js`
- **Database**: MongoDB (Mongoose ODM)

## 📦 Installation

1️⃣ **Clone the repository**

```sh
git clone https://github.com/akashkhedekar8080/youtube-blog.git
cd youtube-blog
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Set up environment variables**  
Create a `.env` file and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

4️⃣ **Start the server**

```sh
npm start
```

Server will run on **`http://localhost:3000`** 🚀

## 📂 Project Structure

```
/youtube-blog
│── /public         # Static files (CSS, JS, Images)
│── /uploads        # Uploaded images
│── /views          # EJS templates
│── /routes         # Express route handlers
│── /controllers    # Business logic functions
│── /models         # Mongoose schemas
│── /middlewares    # Authentication & file handling
│── server.js       # Main server file
│── .gitignore      # Ignoring node_modules & uploads
│── package.json    # Dependencies & scripts
│── README.md       # Project documentation
```

## 🔗 API Routes

| Method | Route              | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/`                | Home Page (All Blogs) |
| GET    | `/blog/:id`        | View Single Blog      |
| GET    | `/blog/add`        | Create Blog Form      |
| POST   | `/blog/add-new`    | Add New Blog          |
| GET    | `/blog/edit/:id`   | Edit Blog Form        |
| POST   | `/blog/edit/:id`   | Update Blog           |
| GET    | `/blog/delete/:id` | Delete Blog           |

## 📜 License

This project is **MIT Licensed**. Feel free to use and modify it! 🚀

---

### 💡 Want to Contribute?

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a **Pull Request** 🎉

---

Made with ❤️ by **[@akashkhedekar8080](https://github.com/akashkhedekar8080)**  
Happy Coding! 🚀
