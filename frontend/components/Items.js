import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      image
      largeImage
      description
      price
    }
  }
`;

const RootWrapper = styled.div`
  text-align: center;
`;
const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  state = {};
  render() {
    return (
      <RootWrapper>
        <Query query={ALL_ITEMS_QUERY}>
          {({ error, loading, data }) => {
            if (error) return <p>Error {error.message}</p>;
            if (loading || !data) return <p>Fetching...</p>;

            return (
              <ItemsWrapper>
                {data.items.map(item => {
                  return <Item item={item} key={item.id} />;
                })}
              </ItemsWrapper>
            );
          }}
        </Query>
      </RootWrapper>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
