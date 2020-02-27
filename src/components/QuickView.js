import React, { Component } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import ButtonAddToCart from './General/ButtonAddToCart';

class QuickView extends Component {
  constructor() {
    super();
  }


  render() {
    let image = this.props.product.image;
    let name = this.props.product.name;
    let price = this.props.product.price;
    let id = this.props.product.id;
    let quantity = this.props.productQuantity;
    return (
      <Modal
        show={this.props.modalActive}
        onHide={this.props.closeModal}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            <Carousel.Item>
              <img src={this.props.product.image} alt={this.props.product.name} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={this.props.product.image} alt={this.props.product.name} />    
            </Carousel.Item>
            <Carousel.Item>
              <img src={this.props.product.image} alt={this.props.product.name} />
            </Carousel.Item>
          </Carousel>
          <div className="quick-view-details">
              <span className="product-name">{this.props.product.name}</span>
              <span className="product-price">{this.props.product.price}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
          {/* <Button variant="primary" >
            Save Changes
          </Button> */}

          <ButtonAddToCart
            onClick={this.props.closeModal}
            addToCart={this.props.addToCart}
            image={image}
            name={name}
            price={price}
            id={id}
            productQuantity={quantity}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QuickView;
