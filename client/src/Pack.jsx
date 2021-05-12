import React from 'react';
import { connect } from 'react-redux';
import { getPacks } from './store/actions/packs/getPacks';
import PackModel from './PackModel';

class Pack extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getThePacks();
  }
  render() {
    let pack = null;
    if (this.props.packs) {
      pack = this.props.packs.filter(
        (pack) => pack.id === window.location.hash.slice(1)
      )[0];
    }
    if (pack === null) {
      pack = this.state.packs.filter(
        (pack) => pack.id === window.location.hash.slice(1)
      )[0];
    }

    return (
      <div>
        {pack && (
          <div>
            <h2>Welcome to the pack page</h2>
            <div id='#plot'></div>
            <PackModel />

            <h3>{pack.name}</h3>
            {pack.SubItem.length > 0 && (
              <ul>
                {pack.SubItem &&
                  pack.SubItem.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
              </ul>
            )}
            {pack.SubItem.length === 0 && <div>No items in this pack!!</div>}
          </div>
        )}

        {!pack && <div>No packs!!</div>}
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getThePacks: () => dispatch(getPacks()),
  };
};

export default connect(mapState, mapDispatch)(Pack);
