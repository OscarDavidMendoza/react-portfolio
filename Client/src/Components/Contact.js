import React from "react";
import { useForm } from "react-hook-form";
import DOMpurify from "dompurify";
import contactMe from "../Assets/images/contactMe.jpeg";
import "../styles/Contact.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const sanitizedFormData = {
        name: DOMpurify.sanitize(data.name),
        email: DOMpurify.sanitize(data.email),
        message: DOMpurify.sanitize(data.message),
      };
      const response = await fetch(
        "http://localhost:5001/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedFormData),
        }
      );

      console.log("Response status:", response.status);
      if (response.ok) {
        alert("Email sent successfully");
        reset();
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to send email");
    }
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <div className="contact-container">
        <img
          src={contactMe}
          className="contact-image"
          alt="Contact background"
        />
        <div className="form-container">
          <form
            className="mailing-form"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                })} // Register name field with validation rules (required, max length 50)
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="error">
                  {errors.name.message}
                </p>
              )}{" "}
              {/* Display error message if validation fails (required or max length exceeded) */}
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })} /* Register email field with validation rules (required, valid email format) */
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="error">
                  {errors.email.message}
                </p>
              )}{" "}
              {/* Display error message if validation fails (required or invalid email format) */}
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows="4"
                {...register("message", {
                  required: true,
                })} /* Register message field with validation rule (required) */
                placeholder="Place your thoughts!"
              />
              {errors.message && (
                <p className="error">
                  {errors.message.message}
                </p>
              )}{" "}
              {/* Display error message if validation fails (required) */}
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
