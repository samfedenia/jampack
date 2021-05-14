import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { addItemToPack } from '../store/actions/packs/addToPack';

class AddToPackSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: props.packs[0] ? props.packs[0].id : null,
      item: props.item.id || null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ pack: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addToPack(this.state.item, this.state.pack);
  }

  render() {
    const primary = lightGreen[100];
    const secondary = lightGreen[600];
    const style = {
      selectContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      },
      button: {
        margin: '.1rem',
        width: '12rem',
        backgroundColor: secondary,
      },
      text: {
        padding: '.2rem',
        fontSize: '1rem',
      },
    };
    const options = this.props.packs;
    return (
      <div className='select-container' style={style.selectContainer}>
        <select
          value={this.state.pack}
          onChange={this.handleChange}
          style={style.text}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.id || null}>
              {option.name}
            </option>
          ))}
        </select>
        <Button
          variant='contained'
          color='secondary'
          style={style.button}
          onClick={this.handleClick}
        >
          Add To Pack
        </Button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToPack: (item, pack) => dispatch(addItemToPack(item, pack)),
  };
};

export default connect(null, mapDispatch)(AddToPackSelect);
