import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import './css/Home.css'

import {Link} from 'react-router-dom'
import Video from './video/home_intro.mp4'
//brand list 
import Motul from './image/motul.svg'
import Fuchs from './image/fuchs.svg'
import Ipone from './image/ipone.svg'
import Liqui from './image/liqui_moly.svg'
import Repsol from './image/repsol.svg'
import Total from './image/total.svg'

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="home">
      <div className="player">
          <video autoPlay loop muted>
              <source src={Video} type='video/mp4'/>
          </video>
          <div className="brands text-center">We are sellers for these brands: </div>
          
          <div className="list_img">
            <Link to="/products/MOTUL">
                <img src={Motul} alt="" width="100" />
            </Link>
            <Link to="/products/FUCHS">
                <img src={Fuchs} alt="" width="100" />
            </Link>
            <Link to="/products/IPONE">
                <img src={Ipone} alt="" width="100" />
            </Link>
            <Link to="/products/LIQUI_MOLY">
                <img src={Liqui} alt="" width="100" />
            </Link>
            <Link to="/products/REPSOL">
                <img src={Repsol} alt="" width="100" />
            </Link>
            <Link to="/products/TOTAL">
                <img src={Total} alt="" width="100" />
            </Link>
          </div>
      </div>
  </div>
  );
};

export default Home;
