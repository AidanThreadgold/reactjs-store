import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import Cookies from "universal-cookie";

class PayPalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {instance: null};
    }
    componentDidMount() {
        let braintree = require('braintree-web-drop-in');
        braintree.create({
            authorization: "",
            selector: ReactDOM.findDOMNode(this.button),
            paypal: {
                flow: 'checkout',
                amount: 30.00,
                currency: 'GBP'
            },
            paypalCredit: {
                flow: 'checkout',
                amount: 30.00,
                currency: 'GBP'
            }
        }, function(err, dropinInstance) {
            this.setState({instance: dropinInstance});
        }.bind(this));
    }
    doApi(url, body, callback) {
        const cookies = new Cookies();
        fetch("http://m222.magento2.local/rest/V1/guest-carts/" + cookies.get("cart-id") + "/" + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 1wuqsc1pgy4a3omc92wi4p2mbs62ubvi',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then(data => {console.log(data); callback(data); })
    }
    takePayment() {
        this.state.instance.requestPaymentMethod(function (err, payload) {
            console.log(payload);
            if (err) {
                return;
            }

            this.doApi('shipping-information', {
                "addressInformation": {
                    "shipping_address" : {
                        "firstname": "Aidan",
                        "lastname": "Threadgold",
                        "street": ['Flat 4', 'Someplace'],
                        'postcode': 'BN1 1HL',
                        'city': 'Brighton',
                        'country_id': 'GB',
                        'telephone': '01273 665455'
                    },
                    "billing_address": {
                        "firstname": "Aidan",
                        "lastname": "Threadgold",
                        "street": ['Flat 4', 'Someplace'],
                        'postcode': 'BN1 1HL',
                        'city': 'Brighton',
                        'country_id': 'GB',
                        'telephone': '01273 665455'
                    },
                    "shipping_method_code": "flatrate",
                    "shipping_carrier_code": "flatrate"
                }
            }, () => {
                this.doApi('payment-information', {
                    "email": "aidan@gene.co.uk",
                    "paymentMethod": {
                        "method": "braintree_paypal",
                        "additional_data": {
                            "payment_method_nonce": payload.nonce
                        }
                    },
                    "billingAddress": {
                        "firstname": "Aidan",
                        "lastname": "Threadgold",
                        "street": ['Flat 4', 'Someplace'],
                        'postcode': 'BN1 1HL',
                        'city': 'Brighton',
                        'country_id': 'GB',
                        'telephone': '01273 665455'
                    }
                }, function(data) {
                    if (data.message) {
                        alert(data.message);
                        return;
                    }

                    const cookies = new Cookies();
                    cookies.remove('cart-id');
                    alert("Your order id is " + data);
                });
            });
        }.bind(this));
    }
    render() {
        return (
            <div>
                <div ref={(div) => { this.button = div; }}></div>
                <div>
                    <Button onClick={() => this.takePayment()}>Take Payment</Button>
                </div>
            </div>
        );
    };
}

export default PayPalButton;
