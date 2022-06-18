import React from 'react'
import './Footer.css'
import {FaFacebook } from 'react-icons/fa'
import {FiInstagram} from  'react-icons/fi'
import { IoLogoTwitter } from 'react-icons/io'

const Footer = () => {
    return (
        <footer>
            <a href="#" className='footer__logo'>Sarjil Patel</a>


            <ul className="permalinks">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#servies">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>

            </ul>


            <div className="footer__socials">
                <a href="https://facebook"><FaFacebook/></a>
                <a href="https://instagram.com"><FiInstagram/></a>
                <a href="https://linkedin"><IoLogoTwitter/></a>
            </div>


            <div className="footer__copyright">
                <small>&copy; Sarjil Patel. All rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer