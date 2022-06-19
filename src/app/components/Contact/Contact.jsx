import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import "./Contact.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";
import api from "../../api/HandleApi";
import { Formik } from "formik";


const Contact = () => {
  const sendEmail = (e) => {
    console.log(e);
  };

  const {
    data: { gmail, whatsapp, facebook },
  } = useContext(SiteContext);

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail />
            <h4>Email</h4>
            <h5>{gmail}</h5>
            <a href={`mailto:${gmail}`} target="_blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <RiMessengerLine />
            <h4>Messenger</h4>
            <h5>Sarjil Patel</h5>
            <a href={facebook} target="_blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp />
            <h4>Whatsapp</h4>
            <h5>+919426087797</h5>
            <a href={whatsapp} target="_blank">
              Send a message
            </a>
          </article>
        </div>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          onSubmit={(values, { setSubmitting }) => {
            api
              .post("message/", {
                ...values,
              })
              .then((res) => {
                if (res.ok) {
                  alert("Message Sent Succefully.");
                } else {
                  alert("Problem occur.");
                  console.log(res);
                }
              });
              setSubmitting(false)
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Your Full Name"
                required
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                rows="7"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                placeholder="Your Message"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Send Message
              </button>
            </form>
          )}
        </Formik>

        <form onSubmit={sendEmail}></form>
      </div>
    </section>
  );
};

export default Contact;
