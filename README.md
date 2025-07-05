
---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/E-commerce-Anbari.git
cd E-commerce-Anbari
```

### 2. Setup Environment Variables

- Copy `server/env.sample` to `.env` in the `server/` directory and fill in your values.

### 3. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 4. Run the Application

#### Using Docker (Recommended)

```bash
cd root
docker-compose up --build
```

#### Or, Run Manually

- **Backend:**
  ```bash
  cd server
  npm run dev
  ```
- **Frontend:**
  ```bash
  cd client
  npm run dev
  ```

- Visit the app at [http://localhost:5173](http://localhost:5173)

---

## 📝 Usage

- Register as a consumer or seller.
- Browse products, add to cart or wishlist.
- Sellers can create stores and manage products.
- Place orders and track them in your dashboard.
- Use the sidebar for navigation and quick actions.

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [LottieFiles](https://lottiefiles.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> Made with ❤️ by Siddhant and contributors.