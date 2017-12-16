import React from "react";

class LayoutComponent extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <title>{this.props.title}</title>
          </head>
          <body>{this.props.children}</body>
        </html>
      </React.Fragment>
    );
  }
}


module.exports = LayoutComponent;
