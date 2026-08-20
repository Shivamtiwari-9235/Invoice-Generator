# Invoice Generator

A simple invoice management app for freelancers and small businesses. It helps you manage clients, create GST invoices, track payments, download PDFs, and send email reminders.

The project has two parts:

- `Frontend`: React and Vite user interface
- `Backend`: Node.js, Express, and MongoDB API

## Features

- Create an account and sign in securely
- Add, edit, search, and delete clients
- Create invoices with GST calculations
- Download invoices as PDF files
- Track paid, pending, and overdue payments
- View dashboard and revenue analytics
- Generate invoice drafts with AI
- Send invoices and payment reminders by email

## Requirements

Install these before starting:

- Node.js 18 or newer
- npm
- MongoDB, either locally or through MongoDB Atlas
- Ollama, only if you want to use the AI invoice generator

## Setup

Open two terminals in the project folder.

### 1. Configure the backend

```bash
cd Backend
npm install
```


npm run dev
```

The backend runs at `http://localhost:5000`.

### 2. Configure the frontend

In the second terminal:

```bash
cd Frontend
npm install
```

Create `Frontend/.env` if the backend uses a different URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Useful Commands

Run these commands inside the `Frontend` folder:

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     
npm run preview  
```

Run these commands inside the `Backend` folder:

```bash
npm run dev      
npm start        
```

- 

