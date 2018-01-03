import React from 'react';

import Header from '../organisms/global/Header'
import { Container, Row, Col } from 'reactstrap';
import { Card, Alert, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class ProductListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: [], loading: true};
    }
    componentDidMount() {
        this.getProducts();
    }
    getProducts() {
        fetch("http://m222.magento2.local/rest/V1/products?searchCriteria[pageSize]=12", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi'
            }
        })
            .then((response) => response.json())
            .then(data => this.setState({ products: data.items, loading: false }));
    }
    render() {

        const products = this.state.products.map((product) =>
            <Col xs="4" key={product.id}>
                <Card>
                    <img top width="100%" src={`http://m222.magento2.local/media/catalog/product${product.custom_attributes[1].value}`} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardSubtitle>£{product.price}</CardSubtitle>
                        <CardText>{product.sku}</CardText>
                        <Button color="primary" onClick={() => { this.props.history.push("/product-page/")}}>Buy Now</Button>
                    </CardBody>
                </Card>
            </Col>
        );

        // @todo this would be a component and page would loading in <productlist> component
        if (this.state.loading === true) {
            return (
                <div>
                    <Header />
                    <Container>
                        <Row>
                            <Col>
                                <Alert color="info">
                                    Loading products
                                </Alert>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }

        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        {products}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ProductListing;
