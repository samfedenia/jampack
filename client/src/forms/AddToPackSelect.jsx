import React from 'react';
import { connect } from 'react-redux';
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
    const options = this.props.packs;
    return (
      <div className='select-container'>
        <select value={this.state.pack} onChange={this.handleChange}>
          {options.map((option, idx) => (
            <option key={idx} value={option.id || null}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={this.handleClick}>Add To Pack</button>
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
