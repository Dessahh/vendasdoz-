import React from "react";
import {AsyncStorage} from "react-native";

export default class Sessao extends React.Component {
    static CPF_KEY = 'cpf';
    static TOKEN_KEY = 'token';

    static user = {};
    static token = '';
    static shopCart = [];

    static login(userCpf, token) {
        AsyncStorage.setItem(this.CPF_KEY, userCpf);
        AsyncStorage.setItem(this.TOKEN_KEY, token);
        Sessao.token = token;
        // TODO: save user info on the session

        // var targetUrl = `http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/${userCpf}`;
        var targetUrl = `http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/66666666666`;

        fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenSessao: token
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                Sessao.user = responseJson;

            });
    }

    static getSessionUser() {
        if (!Sessao.user) {
            // var targetUrl = `http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/${userCpf}`;
            var targetUrl = `http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/66666666666`;

            fetch(targetUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tokenSessao: Sessao.getSessionToken()
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    Sessao.user = responseJson;

                });
        }

        // TODO: wait for request to return
        return Sessao.user;
    }

    static getSessionToken() {
        return Sessao.token;
    }

    static getUserScore(){
        if(!Sessao.userscore){
                var url = 'http://ec2-54-233-234-42.sa-east-1.compute.amazonaws.com:3001/api/v1/consulta'
                var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                var targetUrl = proxyUrl + url;


                return fetch(targetUrl, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'x-www-formurlencoded',
                    },
                    body: JSON.stringify({
                        score: 500,
                        cpf: input.cpf
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log('tentou registrar cred :');
                        console.log(responseJson);
                        //Sessao.userscore = responseJson[0].score
                    })
            }

    }

    static getSessionShopCart() {
        return Sessao.shopCart;
    }

    static addProductToShopCart(product) {
        Sessao.shopCart.push(product);
    }

    static removeProductFromShopCart(product) {
        let cart = [];
        for (let i in Sessao.shopCart) {
            if (product.id !== Sessao.shopCart[i].id) {
                cart.push(Sessao.shopCart[i].id);
            }
        }

        Sessao.shopCart = cart;
    }

    render() {
        return;
    }

}