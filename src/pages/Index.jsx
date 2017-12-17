import React from "react";

class IndexComponent extends React.Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <h1>OK</h1>
    );
  }
}

export default IndexComponent;
