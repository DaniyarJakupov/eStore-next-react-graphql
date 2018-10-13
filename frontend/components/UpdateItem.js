import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";

const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  onInputChange = event => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseInt(value) : value;
    this.setState({ [name]: val });
  };

  onSubmit = async (e, updateItem) => {
    e.preventDefault();

    const res = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });

    Router.push({
      pathname: "/item",
      query: { id: res.data.updateItem.id }
    });
  };

  render() {
    return (
      <Query query={GET_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>loading...</p>;
          if (!data.item) return <p>No Item found for ID {this.props.id}</p>;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, payload) => (
                <Form>
                  <Error error={payload.error} />
                  <h2>Sell an item</h2>
                  <fieldset
                    disabled={payload.loading}
                    aria-busy={payload.loading}
                  >
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="title"
                        required
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        onChange={this.onInputChange}
                      />
                    </label>

                    <button
                      type="submit"
                      onClick={e => this.onSubmit(e, updateItem)}
                    >
                      Save
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
