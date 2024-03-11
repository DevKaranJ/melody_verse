<a name="readme-top"></a>

<div align="center">
  <br/>

  <h3><b>PERN APP</b></h3>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Configuration](#install)
  - [Usage](#usage)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 [Melody Verse] <a name="about-project"></a>

 **[Melody Verse]** is a full stack application, utilizing Node.js, Express.js, React.js, and PostgreSQL as the database. It includes features such as user signup with validation, JWT authentication, a paginated post list screen with infinite scroll, and responsive design using Tailwind CSS. The project aims to provide a visually appealing and consistent user experience under the MelodyVerse theme. Code submission includes API endpoints for user registration and post retrieval, along with JWT token generation and validation for user authentication

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>



<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCss</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>



- **[User signup screen with validation, including optional fields and terms and conditions checkbox.]**
- **[Infinite scrolling post list screen with responsive design using Tailwind CSS.]**
- **[Secure API endpoints with input validation and protection against common attacks.]**
- **[Proper error handling and informative error messages.]**
- **[Secure JWT implementation for user authentication.]**
- **[Environment variable usage for sensitive information.]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>


To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- Node.js and npm installed on your machine.
- A database server (MongoDB, PostgreSQL, MySQL, etc.) set up and running.

### Setup

Clone this repository :

```sh
  git clone https://github.com/DevKaranJ/melody_verse
```
Navigate to the repository :

```sh
  cd melody_verse
```
Install dependencies for the server:

```sh
  npm install

```
Navigate to the client directory:

```sh
  cd frontend
```
Install dependencies for the client:

```sh
  npm install
```

### Configuration

Set up your database connection:
- Create a .env file in the root directory.
- Add your database connection URI in the .env file:

```sh
DB_USER=your_username_here
DB_HOST=your_host_here
DB_DATABASE=your_database_name_here
DB_PASSWORD=your_password_here
DB_PORT=your_port_here

```
Set up JWT secret:
- Add a JWT secret in the .env file:

```sh
  JWT_SECRET=your_jwt_secret_here
```
To generate JWT key run bellow command on terminal :

```sh
  Node generateSecretKey.js
```

### Running the Application

To run the project, execute the following command:

Start the server:

```sh
  node server.js
```

Start the server:

```sh
  cd frontend
  npm start
```

Create a dummy User run:

```sh
  node setup.js
```

- It will create a dummy user with some random posts just go to login and click on demo 

### Usage

Access the application at http://localhost:3001 in your web browser.
Sign up for a new account and start exploring MelodyVerse!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>


👤 **Karan Joshi**

- GitHub: [@githubhandle](https://github.com/DevKaranJ)
- Twitter: [@twitterhandle](https://twitter.com/Dev_Karan_J)
- Linkdin: [@linkdinhandle](https://www.linkedin.com/in/devkaranj/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>


- [ ] **[Password reset functionality.]**
- [ ] **[Email verification for signup.]**
- [ ] **[Rate limiting for protection against brute force attacks.]**
- [ ] **[Middleware for authentication and authorization.]**
- [ ] **[Unit tests for API endpoints.]**
- [ ] **[Social login options with mock APIs and React libraries.]**
- [ ] **[Password visibility toggle.]**
- [ ] **[Use of animations or microinteractions with React libraries like Framer Motion.]**
- [ ] **[Accessibility features including alt text, keyboard navigation, ARIA attributes, and focus management.]**
- [ ] **[Unit testing for React components using Jest or similar libraries.]**


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/DevKaranJ/melody_verse/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>


Your support means a lot to us! By using and contributing to this project, you're helping us make it even better. Feel free to star the repository, share it with your friends, or contribute to its development. Together, we can create something amazing! Thank you for your support! 🚀🌟

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

_NOTE: we recommend using the [MIT license](https://choosealicense.com/licenses/mit/) - you can set it up quickly by [using templates available on GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository). You can also use [any other license](https://choosealicense.com/licenses/) if you wish._

<p align="right">(<a href="#readme-top">back to top</a>)</p>