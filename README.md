
# Online HTML, CSS, and JavaScript Compiler

Fast Online in-browser IDE to craft stunning HTML, CSS, and JavaScript projects with ease – write, compile, and share your creations in a seamless workflow. Save, update, and manage your projects with secure user authentication, ensuring only you can edit your code.


## Tech Stack
![My Skills](https://skillicons.dev/icons?i=react,ts,tailwind,mongodb,nodejs,express)

- Frontend: React
- Backend Framework: Expressjs
- Database: MongoDB
- State Management: Redux Toolkit
- API Integration: RTK Query
- UI Library: Shadcn

## Key Features
- **Real-Time Update:** Changes made to the code are reflected instantly in the preview section.
- **Smart Code Suggestions:** Suggestions based on the chosen programming language enhance coding efficiency and reduce time.
- **Effortless Export:** Users can download the entire HTML, CSS, and JavaScript code of their projects
-  **Save Codes:** Securely manage your projects under "MyCodes" section with user accounts
- **Public Codes:** Non-authenticated users can save and access code in the "All Codes" section.
- **Seamless Sharing:**  Users can effortlessly share their code projects with others by generating a unique URL



## Installation

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en) (which comes with [npm](https://www.npmjs.com/)) installed on your computer 

1. Clone this repository
```bash
git clone https://github.com/krishnathakkar29/Web-Compiler.git
```
2. Navigate to frontend folder
```bash
cd frontend
npm install
```
3. Run the development app
```bash
npm run dev
# bun
bun run dev2
```

Node.js backend
```bash
cd backend
npm i 
npm run dev
```



    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGOURI`: MongoDB url to connect to the database

`JWT_KEY`: JWT Key required for hashing confidential information and maitaining privacy of users

