<h1 align='center'>Frontend with React ⚛</h1>
<h3>Overview</h3>
<h4>My portfolio website showcases my work, skills, and contact information. It includes sections such as:</h4>

- **Home:** Introduction and brief overview.
- **About:** Information about me, my background, and interests.
- **Projects:** Showcase of my projects with descriptions and links.
- **Contact:** Contact form and links to my social profiles.

<h5>Technologies Used</h5>

- **Frontend:** React.js for building the user interface.
- **Styling:** CSS for custom styling.
- **Navigation:** React Router for handling navigation between pages.
- **Icons:** FontAwesome for icons.
- **Burger Menu:** Used react-burger-menu and hamburger-react for the responsive hamburger menu.
- **State Management:** Utilized React hooks such as useState and useEffect for managing state.
- **Deployment:** The website is deployed on localhost.

<br/>

<h1 align='center'>Backend Server with Express</h1>
<h3>Overview</h3>
<h4>The backend server for my portfolio website handles form submissions and sends emails using Nodemailer. It includes features such as rate limiting, content security policy, and logging.</h4>

<h5>Technologies Used</h5>

- **Framework:** Express.js for building the server.
- **Email Handling:** Nodemailer for sending emails.
- **Middleware:** Body-parser for parsing request bodies, cors for enabling Cross-Origin Resource Sharing, helmet for setting various HTTP headers for security, rate-limit for limiting request rates, and Winston for logging.
- **Security:** Content Security Policy (CSP) to mitigate Cross-Site Scripting (XSS) attacks.
- **Environment Variables:** Used dotenv to load environment variables.
- **Logging:** Logtail for centralized logging.

<h5>Setup Instructions</h5>
<p>To set up the portfolio website locally, follow these steps:</p>

- **Clone the repository:** git clone <https://github.com/OscarDavidMendoza/react-portfolio.git>
- **Navigate to the project directory:** cd `MY-PORTFOLIO-REACT` && `MY-PORTFOLIO-REACT/Client`
- **Install dependencies:** `$ npm install`
- **Create a .env file and add your email credentials and Logtail source token.**
- **Make sure to replace "assets/resume/resume.pdf" with the correct path to your resume file on the server.**
- **Start the development server:** `$ npm run dev`
  Open your web browser and go to http://localhost:3001 to view the website. This will also start a server on [port:5001](http://localhost:5001.) for the email server (More details below).

<p>Remember to add your environment variables in a .env file for the server to function.</p>

**Variables to add to your .env file**

- NODEMAILER_ENV_USER =**your email address**
- NODEMAILER_ENV_PASS =**your email password**
  - I recommend the use of an app password. You can use this [document](https://support.google.com/mail/answer/185833?hl=en "document") as guidance.
- LOGTAIL_SOURCE_TOKEN =<your logtail token from logtail.com> // This is used to log information of the email server use. Itt is logged in a created file named email.log and on logtail.com.

<h5>Endpoints</h5>

- POST /send-email: Endpoint for handling form submissions. Expects a JSON payload with name, email, and message fields. Sends an email with the provided information.
- GET /download-resume: To allow users to download my resume, I've added an endpoint to the server.

<h5>Additional Notes</h5>

- **Responsiveness:** The website is designed to be responsive and work well on different screen sizes.
- **Continuous Improvement:** I'm continuously improving and updating the website to enhance its functionality and design.
- **Rate Limiting:** Limits requests to 5 requests within a 15-minute window to prevent abuse.
- **Content Security Policy (CSP):** Sets a strict CSP to mitigate XSS attacks by specifying allowed sources for scripts, images, and styles.
- **Logging:** Utilizes Winston and Logtail for centralized logging of server activities.
- **Error Handling:** Returns appropriate HTTP status codes and error messages for invalid requests or server errors.

<h5>Hosting</h5>

- In the future, we plan to host this on AWS detailing and documenting this process in a blog post.

<br/>
<p>Credits</p>
<p>Author: Oscar Mendoza</p>
<p>GitHub: https://github.com/OscarDavidMendoza</p>
