import React from "react";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <i className="fas fa-shopping-cart fa-7x"/>
     {/*  <h2>You cart is empty!</h2> */}
      <h2>Votre panier est vide!</h2>
    </div>
  );
};

export default EmptyCart;
