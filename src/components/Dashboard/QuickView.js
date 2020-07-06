import React, { Component } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import ButtonAddToCart from '../General/ButtonAddToCart';

class QuickView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let image = this.props.product.image,
        name = this.props.product.name,
        images = this.props.product.images,
        price = this.props.product.price,
        id = this.props.product.id,
        quantity = this.props.productQuantity,
        show = this.props.modalActive,
        hide = this.props.closeModal,
        addToCart = this.props.addToCart;

    let carouselItem = (imgs) => {
      console.log(Object.keys(this.props.product).length)
      if(Object.keys(this.props.product).length !== 0) {
       return imgs.map(img => (
            <Carousel.Item key={img.split('&token=')[1]}>
              <img src={img} alt={ name + ' and other images' } />
            </Carousel.Item>
        ))
      }
    }
    return (
      <Modal
        show={show}
        onHide={hide}
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
            {(Object.keys(this.props.product).length !== 0) ? carouselItem(images, id): '' }
          </Carousel>
          <div className="quick-view-details">
              <span className="product-name">{name}</span>
              <span className="product-price">{price}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonAddToCart
            addToCart={addToCart}
            image={image}
            name={name}
            price={price}
            id={id}
            productQuantity={quantity}
          />
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QuickView;
