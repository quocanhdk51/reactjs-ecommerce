import React from 'react'
import './css/Contact.css'
import { useGoogleMaps } from "react-hook-google-maps";

const location = { lat: 10.722726, lng: 106.704085 };

export default function Contact() {

    const { ref, map, google } = useGoogleMaps(
        "AIzaSyDkqhXyd4pBip7QraNpiRxILqWnvwaGxQg",
        {
          center: location,
          zoom: 14,
          text: "alo"
        },
      );
      console.log("render MapWithMarkers"); 
      if(map) {
          new google.maps.Marker({position: location, map})
      }

    return(
        <div className="contact container">
            <div className="header row text-center">Contact Us for the best service</div>
            <div className="locations row">
                <div className="map" ref={ref} style={{ width: 5000, height: 1000 }} />   
            </div>
            <div className="form">
                <form>
                    <label>
                        <p>Saler: Dat</p>
                    </label>
                    <label>
                        <p>Address: Sunrise riverside, Q7, HCM</p>
                    </label>
                    <label>
                        <p>Phone: +8468568597</p>
                    </label>
                </form>
            </div>
        </div>
    )
}