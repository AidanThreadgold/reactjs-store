import React from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Alert, Badge } from 'reactstrap';
import classnames from 'classnames';
import Header from '../organisms/global/Header';
import Cookies from 'universal-cookie';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            loading: true,
            product: {},
            message: null,
            addingToCart: false
        };
    }
    componentDidMount() {
        this.getProduct();
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getCart(action) {
        const cookies = new Cookies();

        if (!cookies.get("cart-id")) {
            fetch("http://m222.magento2.local/rest/V1/guest-carts", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi'
                }
            })
                .then((response) => response.json())
                .then(data => {
                    cookies.set("cart-id", data, {path: '/'});
                    action(data);
                });
        } else {
            action(cookies.get('cart-id'));
        }
    }
    addToCart() {
        this.setState({addingToCart: true});
        this.getCart((cartId) => {
            fetch("http://m222.magento2.local/rest/V1/guest-carts/" + cartId + "/items", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "cartItem": {
                        "sku": "24-MB02",
                        "qty": 1,
                        "quoteId": cartId,
                    }
                })
            })
                .then((response) => response.json())
                .then(data => {
                    this.setState({addingToCart: false, message: (
                        <Container>
                            <Row>
                                <Alert color="info">Product added to cart!</Alert>
                            </Row>
                        </Container>
                    )});
                    setTimeout(() => {
                        this.setState({message: null});
                    }, 4000);
                });
        });
    }
    getProduct() {
        fetch("http://m222.magento2.local/rest/V1/products/24-MB02", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi'
            }
        })
            .then((response) => response.json())
            .then(data => this.setState({ product: data, loading: false }));
    }
    render() {
        if (this.state.loading === true) {
            return (
                <div>
                    <Header />
                    <Container>
                        <Row>
                            <Col>
                                <Alert color="info">
                                    Loading product
                                </Alert>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }

        let product = this.state.product;
        let button = <Button color="primary" size="lg" onClick={() => { this.addToCart() }}>Add 1 to cart</Button>;

        if (this.state.addingToCart) {
            button = <Button color="primary" size="lg" disabled>Adding to cart...</Button>;
        }

        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <h1>Product Page</h1>
                        </Col>
                    </Row>
                    {this.state.message}
                    <Row>
                        <Col>
                            <Media>
                                <Media left href="#">
                                    <Media object src={`http://m222.magento2.local/media/catalog/product${product.custom_attributes[1].value}`} alt="Generic placeholder image" width="150px" />
                                </Media>
                                <Media body>
                                    <Media heading>{product.name}</Media>
                                    <em>Only £{product.price}</em>
                                    <div>{product.custom_attributes[0].value}</div>

                                    <p>
                                        <Badge color="info">{product.extension_attributes.stock_item.qty} in stock</Badge>
                                    </p>

                                    {button}
                                </Media>
                            </Media>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Reviews
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        Related
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <h4>No Reviews</h4>
                                            <p>No Reviews to show you</p>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="6">
                                            <Card body>
                                                <CardTitle>Special Title Treatment</CardTitle>
                                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                <Button>Go somewhere</Button>
                                            </Card>
                                        </Col>
                                        <Col sm="6">
                                            <Card body>
                                                <CardTitle>Special Title Treatment</CardTitle>
                                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                <Button>Go somewhere</Button>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ProductPage;
