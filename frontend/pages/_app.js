import App, { Container } from "next/app";
import Page from "../components/Page";

class MyApp extends App {
  state = {};
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page />
        <Component />
      </Container>
    );
  }
}

export default MyApp;
