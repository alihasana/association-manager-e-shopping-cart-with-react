import React, {Component} from "react";
import {Button} from "react-bootstrap";

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
            function () {
                let data = this;
                let newProduct = this.state.selectedProduct;
                data.props.addToCart(newProduct);
                let itemsInCart = localStorage.getItem('itemsInCart');
                if (itemsInCart) {
                    let items = JSON.parse(itemsInCart);
                    if (data.checkProduct(newProduct.id, items)) {
                        let index = items.findIndex(x => x.id === newProduct.id);
                        items[index].quantity =
                            Number(items[index].quantity) + Number(newProduct.quantity);
                        localStorage.setItem('itemsInCart', JSON.stringify(items));
                    } else {
                        items.push(newProduct);
                        localStorage.setItem('itemsInCart', JSON.stringify(items));
                    }
                } else {
                    localStorage.setItem('itemsInCart', JSON.stringify([newProduct]))
                }
            }
        );
        this.setState(
            {
                isAdded: true
            },
            function () {
                setTimeout(() => {
                    this.setState({
                        isAdded: false,
                        selectedProduct: {}
                    });
                }, 3500);
            }
        );
    }

    checkProduct(productID, items) {
        return items.some(function (item) {
            return item.id === productID;
        });
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
}

export default ButtonAddToCart;
