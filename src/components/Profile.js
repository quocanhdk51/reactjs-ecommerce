import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {DataContext} from './DataProvider'

const Profile = () => {
  const value = useContext(DataContext);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [receipts, setReceipts] = value.receipts;

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities: </strong> 
        {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
      <h3>
        <strong>Receipt: </strong>
      </h3>
      {receipts.map(receipt => (
        <div className="jumbotron">
          <h6>
            <strong>Date:</strong> {receipt.date}
          </h6>
          {receipt.items.map(item => (
            <p>
              {item.quantity}x {item.product.title}
            </p>
          ))}
          {/* <h6>
            <strong>Total:</strong> {item.total}
          </h6> */}
        </div>
      ))}
    </div>
  );
};

export default Profile;
