import React from 'react';
import { connect } from 'react-redux';
import { getPacks } from './store/actions/packs/getPacks';
import PackModel from './PackModel';
const BinPacking3D = require('binpackingjs').BP3D;
const { Item, Bin, Packer } = BinPacking3D;
let bin = new Bin('pack', 20, 15, 25, Infinity);

let item1 = new Item('item 1', 3, 3, 3, 0.2);

let item2 = new Item('item 2', 5, 6, 5, 2);
let packer = new Packer();
packer.addBin(bin);
packer.addItem(item1);
packer.addItem(item2);

packer.pack();
// console.log('packer items: ', packer.items);
console.log('bin items: ', bin.items);
// console.log('packer unfititems: ', packer.unfitItems);

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
    const packDims = [pack.width, pack.height, pack.length];
    const packItems = pack.SubItem;
    return (
      <div>
        {pack && (
          <div>
            <h2>Welcome to the pack page</h2>
            <div id='#plot'></div>
            <PackModel packDims={packDims} packItems={packItems} />

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
