import React from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import { Button } from 'reactstrap';
import Header from '../organisms/global/Header'

class CartPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <h1>Cart Page</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="1">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=64&h=64" />
                        </Col>
                        <Col xs="9">
                            <h3>Product Name</h3>
                            <p>£12.00</p>
                            <Button color="primary" size="sm">Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CartPage;
