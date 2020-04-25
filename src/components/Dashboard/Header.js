import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "../../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import StripeCheckout from 'react-stripe-checkout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false,
    };
  }
  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }
  static handleSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  onToken = (token, addresses) => {
    console.log(token);
    console.log(addresses);
    if(token.id) {
      localStorage.removeItem('itemsInCart');
      this.setState({
        cart: []
      });
      this.props.clearTotal();
    }
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };
  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img alt='product image' className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            {/* need to change with concern association logo */}
            <i className="fas fa-store fa-4x"/>
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <i className="fas fa-search"/>
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <i className="fas fa-long-arrow-alt-left fa-2x"/>
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Vegetables and Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={Header.handleSubmit.bind(this)}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <i className="fas fa-cart-arrow-down fa-2x"/>
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              <div className="action-block">
                {/*<button
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                >
                  PROCEED TO CHECKOUT
                </button>*/}

                <StripeCheckout
                    stripeKey={process.env.PUBLISHABLE_KEY}
                    token={this.onToken}
                    amount={Number(this.props.total * 100)}
                    currency="EUR"
                    billingAddress
                    shippingAddress
                    description="Shopping list"
                    image=""
                    locale="auto"
                    name=""
                    zipCode
                    label="Pay with 💳"
                    panelLabel="Pay now"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
