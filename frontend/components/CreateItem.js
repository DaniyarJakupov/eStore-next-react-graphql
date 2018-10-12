import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    price: 0,
    image: "",
    largeImage: "",
    description: ""
  };

  onInputChange = event => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseInt(value) : value;
    this.setState({ [name]: val });
  };

  uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "eStore-next");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw8oigkhb/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, payload) => (
          <Form>
            <Error error={payload.error} />
            <h2>Sell an item</h2>
            <fieldset disabled={payload.loading} aria-busy={payload.loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Select an Image"
                  required
                  onChange={this.uploadImage}
                />
                {this.state.image && <img width="200" src={this.state.image} />}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  onChange={this.onInputChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.onInputChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.onInputChange}
                />
              </label>

              <button
                type="submit"
                onClick={async e => {
                  e.preventDefault();

                  const res = await createItem();

                  Router.push({
                    pathname: "/item",
                    query: { id: res.data.createItem.id }
                  });
                }}
              >
                Submit
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
