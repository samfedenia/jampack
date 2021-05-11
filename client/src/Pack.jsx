import React from 'react';
import { connect } from 'react-redux';

class Pack extends React.Component {
  constructor(props) {
    super(props);
  }
  // on mount set the pack in state if not exists
  render() {
    const pack = this.props.packs.filter(
      (pack) => pack.id === window.location.hash.slice(1)
    )[0];

    return (
      <div>
        <h2>Welcome to the pack page</h2>
        <h3>{pack.name}</h3>
        <ul>
          {pack.SubItem &&
            pack.SubItem.map((item, idx) => <li key={idx}>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => state;

export default connect(mapState, null)(Pack);
