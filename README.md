# 📨 Invite-Based User Registration System

This project provides a simple backend system for **invite-based user registration**. Managers can invite users via email, and users can register using their invite link. Roles supported: `tenant` and `houseowner`.

---

## 📦 Tech Stack

- Node.js + TypeScript
- Express.js
- MongoDB (Mongoose)
- express-validator
- **Bull Queue (Redis-based job queue)**
- **Redis** (for background job processing)

---

## ✨ Features

- Invite users via email with a unique token
- Register users using a valid invite
- Validate user input (email, password, role, etc.)
- **Asynchronous email processing via Bull Queue and Redis**
- **Email worker service decouples sending from main app logic**

---

## ⚙️ Redis + Bull Queue Integration

To improve responsiveness and scalability, the system uses **Bull Queue** with **Redis** to manage email invites in the background.

### 🔧 How It Works

1. When a manager sends an invite, a job is added to the `email` queue.
2. Redis stores the job in memory.
3. A background **email worker** consumes the queue and sends the actual email.

This approach avoids blocking the HTTP request and allows retries if email delivery fails.

---

## 🚀 Getting Started

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/Elvinkess/invite-system.git
cd Simple-invite-system
npm install


## 📂 API Endpoints
Send an invite to a user's email.
### 🔹 `POST /users/invite`

Invitee register via this endpoint with their token from the invite
### 🔹 `POST /users/register/:token'`

##use the .evn.example to configure your environmental variables

##In another terminal run the below command to see email_worker.ts working
npx ts-node src/core/infrastruture/service/email/email_worker.ts

##In another terminal run the below command to start redis server
brew services start redis
