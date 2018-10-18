import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_ITEMS_QUERY } from "./Items";

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;

class DeleteItem extends Component {
  state = {};

  updateCache = (cache, payload) => {
    // manually update the cache on a client
    // 1. Read the apollo cache
    const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter out the deleted item from the cache
    const newItems = items.filter(item => item.id !== this.props.id);
    // 3. Update the cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: { items: newItems } });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.updateCache}
      >
        {(deleteItem, payload) => {
          return (
            <button
              onClick={async () => {
                const res = await deleteItem();
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
