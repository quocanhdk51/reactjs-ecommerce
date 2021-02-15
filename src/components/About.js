import React from 'react'
import './css/About.css'
import about from './image/about3.jpg'

export default function About() {
    return (
        <div className="about">
            <div className="header">
                <header>Our Story</header> 
            </div>
            
            <div className="quotes">
                <img src={about} alt="quotes" width="600"/>
                <span>"FROM TRACK TO ROAD"</span>
                <span>We undertake to bring the best choice for bikerholics</span>
            </div>

        </div>
    )
}