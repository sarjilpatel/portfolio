import React from 'react'
import './Contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {BsWhatsapp} from 'react-icons/bs'
import  { useRef } from 'react';
import emailjs from 'emailjs-com'

const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_di71t4p', 'template_qj934pt', form.current, 'sjGfu-sMbWSFsHDig')

        e.target.reset()
      };
  return (
    <section id='contact'>
        <h5>Get In Touch</h5>
        <h2>Contact Me</h2>

        <div className="container contact__container">
            <div className="contact__options">
                <article className="contact__option">
                    <MdOutlineEmail/>
                    <h4>Email</h4>
                    <h5>sarjilpatel2903@gmail.com</h5>
                    <a href="mailto:sarjilpatel2903@gmail.com" target='_blank'>Send a message</a>
                </article>
                <article className="contact__option">
                    <RiMessengerLine/>
                    <h4>Messenger</h4>
                    <h5>Sarjil Patel</h5>
                    <a href="mailto:sarjilpatel2903@gmail.com" target='_blank'>Send a message</a>
                </article>
                <article className="contact__option">
                    <BsWhatsapp/>
                    <h4>Whatsapp</h4>
                    <h5>+919426087797</h5>
                    <a href="https://wa.me/+919426087797" target='_blank'>Send a message</a>
                </article>
            </div>


            <form ref={form} onSubmit={sendEmail}>
                <input type="text" name='name' placeholder='Your Full Name' required/>
                <input type="email" name='email' placeholder='Your Email' required/>
                <textarea name="message" rows='7' placeholder='Your Message'></textarea>
                <button type='submit' className='btn btn-primary'>Send Message</button>
            </form>
        </div>
    </section>
  )
}

export default Contact