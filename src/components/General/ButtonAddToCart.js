import React, {Component} from "react";
import {Button} from "react-bootstrap";

class ButtonAddToCart extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            isAdded: false
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addToCart(image, name, price, id, quantity) {
        this.setState({
                selectedProduct: {image, name, price, id, quantity}
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
        this._isMounted = true;
        this.setState(
            {
                isAdded: true
            },
            function () {
                let data= this;
                setTimeout(() => {
                    if(data._isMounted) {
                        this.setState({
                            isAdded: false,
                            selectedProduct: {}
                        });
                    }
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
        let data = this,
            image = data.props.image,
            name = data.props.name,
            price = data.props.price,
            id = data.props.id,
            quantity = data.props.productQuantity;
        return (
            <Button
                className={!data.state.isAdded ? "" : "added"}
                type="button"
                onClick={data.addToCart.bind(data, image, name, price, id, quantity)}
            >
                {!data.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
            </Button>
        );
    }
}

export default ButtonAddToCart;
