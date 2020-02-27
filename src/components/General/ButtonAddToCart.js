import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ButtonAddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      isAdded: false
    };
  }

  addToCart(image, name, price, id, quantity) {
    this.setState({
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let quantity = this.props.productQuantity;
  return (
    <Button
      className={!this.state.isAdded ? "" : "added"}
      type="button"
      onClick={this.addToCart.bind(this, image, name, price, id, quantity)}
    >
      {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
    </Button>
  );
  }
};

export default ButtonAddToCart;
