import React, { Component } from "react";
import Header from "./Header";
import Products from "./Products";
import Footer from "./Footer";
import QuickView from "./QuickView";
import "../../scss/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../utils/api'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            totalItems: 0,
            totalAmount: 0,
            term: "",
            category: "",
            cartBounce: false,
            quantity: 1,
            quickViewProduct: {},
            modalActive: false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMobileSearch = this.handleMobileSearch.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.sumTotalItems = this.sumTotalItems.bind(this);
        this.sumTotalAmount = this.sumTotalAmount.bind(this);
        this.checkProduct = this.checkProduct.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.clearTotal = this.clearTotal.bind(this);
    }
    // Fetch Initial Set of Products from external API
    getProducts = () => {
        let query = ` query {
        products {
        id,name, description, mainImageUrl, mainThumbnailUrl, images, price, vat, associationId, createdAt
        }}`;
         api.post('', {query}).then(
             response => {
            console.log(response.data.data.products);
             this.setState({
                products: response.data.data.products
            });
        });
    }

    updateCart () {
        let itemsInCart = localStorage.getItem('itemsInCart');
        if (itemsInCart) {
            this.setState({
                cart: JSON.parse(itemsInCart)
            });
            this.sumTotalItems(JSON.parse(itemsInCart));
            this.sumTotalAmount(JSON.parse(itemsInCart));
        }
    }
    componentWillMount() {
        this.getProducts();
        this.updateCart();
    }

    // Search by Keyword
    handleSearch(event) {
        this.setState({ term: event.target.value });
    }
    // Mobile Search Reset
    handleMobileSearch() {
        this.setState({ term: "" });
    }
    // Filter by Category
    handleCategory(event) {
        this.setState({ category: event.target.value });
    }
    // Add to Cart
    handleAddToCart(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.quantity;
        if (this.checkProduct(productID)) {
            let index = cartItem.findIndex(x => x.id === productID);
            cartItem[index].quantity =
                Number(cartItem[index].quantity) + Number(productQty);
            this.setState({
                cart: cartItem
            });
        } else {
            cartItem.push(selectedProducts);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true
        });
        setTimeout(
            function() {
                this.setState({
                    cartBounce: false,
                    quantity: 1
                });
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
    }
    handleRemoveProduct(id, e) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.id === id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        localStorage.setItem('itemsInCart', JSON.stringify(cart));
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
        e.preventDefault();
    }
    checkProduct(productID) {
        let cart = this.state.cart;
        return cart.some(function(item) {
            return item.id === productID;
        });
    }
    sumTotalItems(cart) {
        this.setState({
            totalItems: cart.length
        });
    }
    sumTotalAmount(cart) {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        });
    }

    //Reset Quantity
    updateQuantity(qty) {
        console.log("quantity added...");
        this.setState({
            quantity: qty
        });
    }
    // Open Modal
    openModal(product) {
        this.setState({
            quickViewProduct: product,
            modalActive: true
        });
    }
    // Close Modal
    closeModal() {
        this.setState({
            modalActive: false
        });
    }
    // Clear No. of item and total
    clearTotal() {
        this.setState( {
            totalItems: 0,
            totalAmount: 0
        })
    }

    render() {
        return (
            <div className="container">
                <Header
                    cartBounce={this.state.cartBounce}
                    total={this.state.totalAmount}
                    totalItems={this.state.totalItems}
                    cartItems={this.state.cart}
                    clearTotal={this.clearTotal}
                    removeProduct={this.handleRemoveProduct}
                    handleSearch={this.handleSearch}
                    handleMobileSearch={this.handleMobileSearch}
                    handleCategory={this.handleCategory}
                    categoryTerm={this.state.category}
                    updateQuantity={this.updateQuantity}
                    productQuantity={this.state.moq}
                />
                <Products
                    productsList={this.state.products}
                    searchTerm={this.state.term}
                    addToCart={this.handleAddToCart}
                    productQuantity={this.state.quantity}
                    updateQuantity={this.updateQuantity}
                    openModal={this.openModal}
                />
                <Footer />
                <QuickView
                    product={this.state.quickViewProduct}
                    modalActive={this.state.modalActive}
                    closeModal={this.closeModal}
                    addToCart={this.handleAddToCart}
                    productQuantity={this.state.quantity}
                />
            </div>
        );
    }
}

export default Dashboard;
