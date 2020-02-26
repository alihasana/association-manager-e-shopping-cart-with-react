import React, { Component } from "react";

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <i class="fas fa-shopping-cart fa-7x"></i>
     {/*  <h2>You cart is empty!</h2> */}
      <h2>Votre panier est vide!</h2>
    </div>
  );
};

export default EmptyCart;
