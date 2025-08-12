# 🐾 AdoptConnect API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v5+-blue.svg)

A RESTful API designed to manage pet adoption appointments. Features include user authentication, pet profile management, and appointment scheduling capabilities.

## ✨ Features

- **User Management**: Registration, authentication, and profile management
- **Pet Profiles**: Create and manage pet listings available for adoption
- **Appointment System**: Schedule, update, and cancel adoption appointments
- **Role-Based Access**: Different privileges for administrators and regular users
- **Profile Pictures**: Support for user profile images
- **Secure Authentication**: JWT-based authentication system

## 🛠️ Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for secure authentication
- **Mongoose**: MongoDB object modeling for Node.js
- **Multer**: File upload handling for profile pictures

## 🚀 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Elux-2021572/lab-2-taller.git
cd lab-2-taller
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following content:
```env
MONGO_URI=<your_mongodb_connection_string>
PORT=<your_server_port>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📌 API Endpoints

### Authentication

- **Register User**
  - **URL:** `/adoptionSystem/v1/auth/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "password": "string",
      "role": "string",
      "profilePicture": "file"
    }
    ```

- **Login**
  - **URL:** `/adoptionSystem/v1/auth/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### User Management

- **Get User by ID**
  - **URL:** `/adoptionSystem/v1/user/findUser/:uid`
  - **Method:** `GET`

- **Delete User**
  - **URL:** `/adoptionSystem/v1/user/deleteUser/:uid`
  - **Method:** `DELETE`

- **List Users**
  - **URL:** `/adoptionSystem/v1/user/`
  - **Method:** `GET`

- **Update User Password**
  - **URL:** `/adoptionSystem/v1/user/updatePassword/:uid`
  - **Method:** `PATCH`
  - **Body:**
    ```json
    {
      "newPassword": "string"
    }
    ```

- **Update User Information**
  - **URL:** `/adoptionSystem/v1/user/updateUser/:uid`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "name": "string",
      "surname": "string"
    }
    ```

- **Update User Profile Picture**
  - **URL:** `/adoptionSystem/v1/user/updatePictureProfile/:uid`
  - **Method:** `PATCH`
  - **Body:**
    ```json
    {
      "newProfilePicture": "file"
    }
    ```

### Pet Management

- **Register Pet**
  - **URL:** `/adoptionSystem/v1/pet/addPet`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "age": "number",
      "type": "string",
      "email": "string"
    }
    ```

- **Get Pet by ID**
  - **URL:** `/adoptionSystem/v1/pet/findPet/:pid`
  - **Method:** `GET`

- **Delete Pet**
  - **URL:** `/adoptionSystem/v1/pet/deletePet/:pid`
  - **Method:** `DELETE`

- **List Pets**
  - **URL:** `/adoptionSystem/v1/pet/`
  - **Method:** `GET`

### Appointment Management

- **Create Appointment**
  - **URL:** `/adoptionSystem/v1/appointment/createAppointment`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "date": "2023-10-15T10:00:00Z",
      "pet": "string",
      "user": "string"
    }
    ```

- **List Appointments**
  - **URL:** `/adoptionSystem/v1/appointment/getAppointment`
  - **Method:** `GET`
  - **Body:**
    ```json
    {
      "uidUser": "string"
    }
    ```

- **Update Appointment**
  - **URL:** `/adoptionSystem/v1/appointment/updateAppointment/:uid`
  - **Method:** `PATCH`
  - **Parameters:** `uid: appointment ID to update`
  - **Body:**
    ```json
    {
      "pet": "string",
      "user": "string"
    }
    ```

- **Cancel Appointment**
  - **URL:** `/adoptionSystem/v1/appointment/cancelAppointment/:uid`
  - **Method:** `PATCH`
  - **Parameters:** `uid: appointment ID to cancel`

## 🔑 Authentication

Protected routes require a JWT token in the request headers:
```json
{
  "Authorization": "Bearer <your_token_here>"
}
```

## 📖 Usage Examples

### Registering a New User
```javascript
const formData = new FormData();
formData.append('name', 'John');
formData.append('surname', 'Doe');
formData.append('username', 'johndoe');
formData.append('email', 'john.doe@example.com');
formData.append('phone', '1234567890');
formData.append('password', 'securePassword123');
formData.append('role', 'USER');
formData.append('profilePicture', fileInput.files[0]);

fetch('http://localhost:3000/adoptionSystem/v1/auth/register', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Creating an Adoption Appointment
```javascript
fetch('http://localhost:3000/adoptionSystem/v1/appointment/createAppointment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({
    date: '2023-10-15T10:00:00Z',
    pet: 'pet_id_here',
    user: 'user_id_here'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Elux-2021572** - [GitHub Profile](https://github.com/Elux-2021572)

---

Made with ❤️ by Elux-2021572
