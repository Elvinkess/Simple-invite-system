# 📨 Invite-Based User Registration System

This project provides a simple backend system for **invite-based user registration**. Managers can invite users via email, and users can register using their invite link. Roles supported: `tenant` and `houseowner`.

## 📦 Tech Stack

- Node.js + TypeScript
- Express.js
- MongoDB (Mongoose)
- express-validator

## ✨ Features

- Invite users via email with a unique token
- Register users using a valid invite
- Validate user input (email, password, role, etc.)



## 📂 API Endpoints
Send an invite to a user's email.
### 🔹 `POST /users/invite`

Invitee register vai this endpoint with their token from the invite
### 🔹 `POST /users/register/:token'`


