import React, { Component } from "react";
import Counter from "./Counter";
import ButtonAddToCart from "./General/ButtonAddToCart";
import {Button} from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickViewProduct: {}
    };
  }
  
  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProduct: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProduct);
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
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              id,
              quantity
            )}
          />
        </div>
        <h4 className="product-name">{name}</h4>
        <p className="product-price">{price}</p>
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
        <div className="product-action">
          <ButtonAddToCart
            addToCart={this.props.addToCart}
            image={image}
            name={name}
            price={price}
            id={id}
            productQuantity={quantity}
          />
        </div>
      </div>
    );
  }
}

export default Product;
