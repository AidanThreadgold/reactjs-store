import React from 'react';

import Header from '../organisms/global/Header'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class ProductListing extends React.Component {
    render() {
        var productData = [
            {id: 1, name: "Prod 1", "price": "10.00"},
            {id: 2, name: "Prod 2", "price": "95.42"},
            {id: 3, name: "Prod 3", "price": "236.84"},
        ];

        const products = productData.map((product) =>
            <Col xs="4" key={product.id}>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardSubtitle>£{product.price}</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button color="primary" onClick={() => { this.props.history.push("/product-page/")}}>Buy Now</Button>
                    </CardBody>
                </Card>
            </Col>
        );

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
