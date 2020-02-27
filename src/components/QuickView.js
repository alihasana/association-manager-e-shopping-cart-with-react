import React, { Component } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";

class QuickView extends Component {
  render() {
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
          <Button variant="primary" onClick={this.props.closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QuickView;
