import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Alert } from 'reactstrap';
import Header from '../organisms/global/Header'
import Cookies from "universal-cookie";
import PayPalButton from '../PayPalButton';

class CartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            message: null
        };
    }
    componentDidMount() {
        this.getCart();
    }
    getCart() {
        const cookies = new Cookies();

        this.setState({
            message: (
                <Container>
                    <Row>
                        <Alert color="info">Loading...</Alert>
                    </Row>
                </Container>
            )
        })

        if (cookies.get("cart-id")) {
            fetch("http://m222.magento2.local/rest/V1/guest-carts/" + cookies.get('cart-id'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi'
                }
            })
                .then((response) => response.json())
                .then(data => this.setState({
                    cartItems: data.items,
                    loading: false,
                    message: null
                }));
        } else {
            this.setState({
                message: (
                    <Container>
                        <Row>
                            <Alert color="warning">You have no items in your cart!</Alert>
                        </Row>
                    </Container>
                )
            })
        }
    }
    render() {
        const products = this.state.cartItems.map((product) =>
            <Col xs="4" key={product.sku}>
                <Card>
                    <CardBody>
                        <CardTitle>{product.name} ({product.sku})</CardTitle>
                        <CardSubtitle>£{product.price}</CardSubtitle>
                        <CardText>Qty: {product.qty}</CardText>
                    </CardBody>
                </Card>
            </Col>
        );

        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <h1>Cart Page</h1>
                        </Col>
                    </Row>
                </Container>
                {this.state.message}
                <Container>
                    <Row>
                        {products}
                    </Row>
                    <Row>
                        <PayPalButton />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CartPage;
