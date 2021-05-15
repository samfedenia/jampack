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
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      td: {
        padding: '0 15px',
        width: 'auto',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: secondary,
      },
      tdx: {
        padding: '0 15px',
        width: 'auto',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'red',
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
    let notInPack = null;
    let sortedPackSubitems = [];
    let sortedNotinPack = [];
    let sortedPrePackItems = [];
    if (this.props.packs.length > 0) {
      pack = this.props.packs.filter(
        (pack) => pack.id === window.location.hash.slice(1)
      )[0];
      packDims = [pack.width, pack.height, pack.depth];
      let bin = new Bin('pack', pack.width, pack.height, pack.depth, Infinity);
      const itemArr = [];
      sortedPrePackItems = pack.SubItem.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      for (let i = 0; i < sortedPrePackItems.length; i++) {
        let currentItem = pack.SubItem[i];
        itemArr.push(
          new Item(
            currentItem.name,
            currentItem.width,
            currentItem.height,
            currentItem.depth,
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
      notInPack = [];
      if (packer.unfitItems.length > 0) {
        for (let item of packer.unfitItems) {
          notInPack.push(item.name);
        }
      }
      const factor = 1 * 10 ** 5;
      itemsToPack = [];
      for (let i = 0; i < bin.items.length; i++) {
        let currentItem = bin.items[i];
        let currentItemPosition = [];
        switch (currentItem.rotationType) {
          case 1: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.height,
              currentItem.width,
              currentItem.depth,
            ];
            break;
          }
          case 2: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.height,
              currentItem.depth,
              currentItem.width,
            ];
            break;
          }
          case 3: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.depth,
              currentItem.height,
              currentItem.width,
            ];
            break;
          }
          case 4: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.depth,
              currentItem.width,
              currentItem.height,
            ];
            break;
          }
          case 5: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.width,
              currentItem.depth,
              currentItem.height,
            ];
            break;
          }
          default: {
            [currentItem.width, currentItem.height, currentItem.depth] = [
              currentItem.width,
              currentItem.height,
              currentItem.depth,
            ];
          }
        }
        currentItemPosition = [
          currentItem.position[0] / factor + currentItem.width / (2 * factor),
          currentItem.position[1] / factor + currentItem.height / (2 * factor),
          currentItem.position[2] / factor + currentItem.depth / (2 * factor),
        ];

        itemsToPack.push([
          [
            currentItem.width / factor,
            currentItem.height / factor,
            currentItem.depth / factor,
          ],
          currentItemPosition,
        ]);
      }
      for (let item of pack.SubItem) {
        if (!notInPack.includes(item.name)) {
          sortedPackSubitems.push(item);
        } else {
          sortedNotinPack.push(item);
        }
      }
      sortedPackSubitems.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      sortedPackSubitems = [...sortedPackSubitems, ...sortedNotinPack];

      const totalItemsWeight = pack.SubItem.reduce((acc, cur) => {
        if (!notInPack.includes(cur.name)) {
          acc += 1 * cur.weight;
          return acc;
        } else {
          return acc;
        }
      }, 0);
      totalWeight = Math.round(
        (10 * (1 * pack.weight + totalItemsWeight)) / 10
      );
    }
    const colors = [
      'palegreen',
      'cyan',
      'pink',
      'thistle',
      'gold',
      'powderblue',
      'peachpuff',
      '#FF6633',
      '#FFB399',
      '#FFFF99',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
      '#E666FF',
      '#4DB3FF',
      '#1AB399',
      '#E666B3',
      '#33991A',
      '#CC9999',
      '#B3B31A',
      '#00E680',
      '#4D8066',
      '#809980',
      '#E6FF80',
      '#1AFF33',
      '#999933',
      '#FF3380',
      '#CCCC00',
      '#66E64D',
      '#4D80CC',
      '#9900B3',
      '#E64D66',
      '#4DB380',
      '#FF4D4D',
      '#99E6E6',
      '#6666FF',
    ];
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 'bold' }}>{pack.name}</div>
                    <div
                      style={{ fontSize: 'smaller' }}
                    >{`Loaded pack weight: ${
                      Math.round((10 * totalWeight) / 1000) / 10
                    } [kg]`}</div>
                    <div
                      style={{ fontSize: 'smaller' }}
                    >{`Unloaded Pack weight: ${
                      Math.round((10 * pack.weight) / 1000) / 10
                    } [kg]`}</div>
                    <div
                      style={{ fontSize: 'smaller' }}
                    >{`% due to pack weight: ${
                      Math.round(10 * (pack.weight / totalWeight) * 100) / 10
                    } [%]`}</div>
                  </div>
                  <img
                    style={{ height: '120px', width: '120px' }}
                    src={pack.image_url}
                  />
                </div>
              </div>
              <table style={style.table}>
                <thead>
                  <tr>
                    <td style={style.tdh}>Name</td>
                    <td style={style.tdh}>Fits?</td>
                    <td style={style.tdh}>Key</td>
                    <td style={style.tdh}>Weight [%]</td>
                    <td style={style.tdh}>Weight [kg]</td>
                    <td style={style.tdh}>Photo</td>
                    <td style={style.tdh}>Remove</td>
                  </tr>
                </thead>
                {sortedPackSubitems.length > 0 && (
                  <tbody>
                    {sortedPackSubitems.map((item, idx) =>
                      !notInPack.includes(item.name) ? (
                        <tr key={idx}>
                          <td style={style.td}>{item.name}</td>
                          <td style={style.td}>✔</td>
                          <td style={style.td}>
                            <div
                              style={{
                                backgroundColor: `${colors[idx]}`,
                                width: '25px',
                                height: '25px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                              }}
                            ></div>
                          </td>
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
                      ) : (
                        <tr key={idx}>
                          <td style={style.tdx}>{item.name}</td>
                          <td style={style.tdx}>🚫</td>
                          <td style={style.td}>-</td>
                          <td style={style.tdx}>{'-'}</td>
                          <td style={style.tdx}>
                            {`${Math.round(10 * (item.weight / 1000)) / 10} kg`}
                          </td>
                          <td style={style.tdx}>
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
                      )
                    )}
                  </tbody>
                )}
              </table>
            </Typography>

            <PackModel
              packDims={packDims}
              packItems={itemsToPack}
              colors={colors}
            />
            {pack.SubItem.length === 0 && (
              <Typography variant='h4' style={style.text}>
                No items in this pack!!
              </Typography>
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
