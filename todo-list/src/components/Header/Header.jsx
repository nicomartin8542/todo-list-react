import React from 'react';

export class Header extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <h1>TodoList</h1>
      </header>
    );
  }
}
