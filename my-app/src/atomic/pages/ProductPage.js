import React from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import Header from '../organisms/global/Header'

class ProductPage extends React.Component {
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
                            <h1>Product Page</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Media>
                                <Media left href="#">
                                    <Media object src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Generic placeholder image" />
                                </Media>
                                <Media body>
                                    <Media heading>Product Name</Media>
                                    <em>Only £12.00</em>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium autem blanditiis consequuntur debitis deleniti et ex facilis, id iste libero modi optio perferendis praesentium quis repellat saepe voluptas, voluptates!</p>

                                    <Button color="primary" size="lg">Add to cart</Button>{' '}
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
