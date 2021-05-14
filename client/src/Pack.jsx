import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { connect } from 'react-redux';
import { getPacks } from './store/actions/packs/getPacks';
import { removeItemFromPack } from './store/actions/packs/removeFromPack';
import PackModel from './PackModel';
const BinPacking3D = require('binpackingjs').BP3D;
const { Item, Bin, Packer } = BinPacking3D;

class Pack extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getThePacks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.packs === prevProps.packs) {
      this.props.getThePacks();
    }
  }
  render() {
    const primary = lightGreen[100];
    const secondary = lightGreen[600];
    const style = {
      root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      },
      text: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Roboto',
      },
      button: {
        margin: '1rem',
        width: '10rem',
        backgroundColor: secondary,
      },
      link: {
        color: secondary,
      },
      tdh: {
        padding: '0 15px',
        fontWeight: 'bold',
      },
      td: {
        padding: '0 15px',
        width: 'auto',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      table: {
        borderCollapse: 'collapse',
        paddingBottom: '1rem',
        width: 'auto',
        marginLeft: '5rem',
        marginRight: '5rem',
      },
      tdButton: {
        margin: 'auto',
        display: 'block',
        backgroundColor: secondary,
        color: 'white',
      },
    };
    let pack = null;
    let packDims = [null, null, null];
    let itemsToPack = null;
    let totalWeight = null;
    if (this.props.packs.length > 0) {
      pack = this.props.packs.filter(
        (pack) => pack.id === window.location.hash.slice(1)
      )[0];
      packDims = [pack.width, pack.height, pack.length];
      let bin = new Bin('pack', pack.width, pack.height, pack.length, Infinity);
      const itemArr = [];
      for (let i = 0; i < pack.SubItem.length; i++) {
        let currentItem = pack.SubItem[i];
        itemArr.push(
          new Item(
            currentItem.name,
            currentItem.width,
            currentItem.height,
            currentItem.length,
            currentItem.weight
          )
        );
      }
      let packer = new Packer();
      packer.addBin(bin);
      for (let i = 0; i < itemArr.length; i++) {
        packer.addItem(itemArr[i]);
      }
      packer.pack();

      const factor = 1 * 10 ** 5;
      itemsToPack = [];
      for (let i = 0; i < bin.items.length; i++) {
        let currentItem = bin.items[i];

        let currentItemPosition = [
          Math.round(
            (100 *
              (currentItem.position[0] / factor +
                currentItem.depth / (2 * factor))) /
              100
          ),
          Math.round(
            (100 *
              (currentItem.position[1] / factor +
                currentItem.width / (2 * factor))) /
              100
          ),
          Math.round(
            (100 *
              (currentItem.position[2] / factor +
                currentItem.height / (2 * factor))) /
              100
          ),
        ];
        console.log(itemsToPack);
        console.log(bin.items);

        itemsToPack.push([
          [
            currentItem.depth / factor,
            currentItem.width / factor,
            currentItem.height / factor,
          ],
          currentItemPosition,
        ]);
      }
      console.log(bin.items);

      const totalItemsWeight = pack.SubItem.reduce(
        (acc, cur) => (acc += 1 * cur.weight),
        0
      );
      totalWeight = Math.round(
        (10 * (1 * pack.weight + totalItemsWeight)) / 10
      );
    }

    return (
      <div>
        {pack !== null && itemsToPack && (
          <div id='pack-page'>
            <Typography variant='h4' style={style.text}>
              <Link underline='none' style={style.link} to='/account'>
                <Button
                  variant='contained'
                  color='secondary'
                  style={style.button}
                >
                  Back
                </Button>
              </Link>
              <div
                style={{
                  diplay: 'inline-block',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                <div>{pack.name}</div>
                <div>{`Total pack weight: ${totalWeight / 1000} [kg]`}</div>
                <img
                  style={{ height: '100px', width: '100px' }}
                  src={pack.image_url}
                />
              </div>
              <table style={style.table}>
                <thead>
                  <tr>
                    <td style={style.tdh}>Name</td>
                    <td style={style.tdh}>Weight [%]</td>
                    <td style={style.tdh}>Weight [kg]</td>
                    <td style={style.tdh}>Photo</td>
                    <td style={style.tdh}>Remove</td>
                  </tr>
                </thead>
                {pack.SubItem.length > 0 && (
                  <tbody>
                    {pack.SubItem.map((item, idx) => (
                      <tr key={idx}>
                        <td style={style.td}>{item.name}</td>
                        <td style={style.td}>
                          {`${
                            Math.round(
                              10 * (100 * (item.weight / totalWeight))
                            ) / 10
                          } %`}
                        </td>
                        <td style={style.td}>
                          {`${Math.round(10 * (item.weight / 1000)) / 10} kg`}
                        </td>
                        <td style={style.td}>
                          <img
                            style={{ height: '50px', width: '50px' }}
                            src={item.image_url}
                          />
                        </td>
                        <td>
                          <Button
                            style={style.tdButton}
                            variant='contained'
                            onClick={() => this.props.removeFromPack(item.id)}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </Typography>

            <PackModel packDims={packDims} packItems={itemsToPack} />
            {pack.SubItem.length === 0 && (
              <div style={style.text}>No items in this pack!!</div>
            )}
          </div>
        )}

        {!pack && (
          <Typography variant='h4' style={style.text}>
            <div>No packs!!</div>
          </Typography>
        )}
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getThePacks: () => dispatch(getPacks()),
    removeFromPack: (itemId) => dispatch(removeItemFromPack(itemId)),
  };
};

export default connect(mapState, mapDispatch)(Pack);
