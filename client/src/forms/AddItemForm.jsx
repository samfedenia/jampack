import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createItem } from '../store/actions/items/createItem';

const primary = lightGreen[100];
const secondary = lightGreen[600];
const style = {
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '0',
  },
  textField: {
    width: '50ch',
    margin: '8px',
  },
  button: {
    marginTop: '2rem',
    width: '10rem',
    backgroundColor: secondary,
  },
  form: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  errorText: {
    color: 'red',
  },
  selectDiv: {
    width: '43.5ch',
    // margin: '8px',
  },
};

export default function AddItemForm() {
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    category: '',
    depth: '',
    weight: '',
    width: '',
    height: '',
    userId: '',
    image_url: '',
  });

  function onChange(ev) {
    setData({ ...data, [ev.target.name]: ev.target.value });
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setData({
      ...data,
      name: '',
      category: '',
      depth: '',
      weight: '',
      width: '',
      height: '',
      userId: '',
      image_url: '',
    });
    dispatch(
      createItem({
        name: data.name,
        category: data.category,
        weight: data.weight,
        depth: data.depth,
        width: data.width,
        height: data.height,
        userId: user.id,
        image_url: data.image_url,
      })
    );
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <div style={style.root}>
      <form onSubmit={onSubmit} autoComplete='off' style={style.form}>
        <div>
          <Typography variant='h4'>Add an Item:</Typography>
        </div>
        {error !== '' && (
          <Typography variant='h6' style={style.errorText}>
            {error}
          </Typography>
        )}
        {loading && <Typography variant='h6'>Loading...</Typography>}
        <FormControl>
          <InputLabel id='cat-label'>Category</InputLabel>
          <Select
            labelId='cat-label'
            id='demo-simple-select'
            value={data.category}
            onChange={onChange}
            name='category'
            style={style.selectDiv}
          >
            <MenuItem value={'Pack'}>Pack</MenuItem>
            <MenuItem value={'Shelter'}>Shelter</MenuItem>
            <MenuItem value={'Food'}>Food</MenuItem>
            <MenuItem value={'Clothing'}>Clothing</MenuItem>
            <MenuItem value={'Medical'}>Medical</MenuItem>
            <MenuItem value={'Utility'}>Utility</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            label='Name'
            style={style.textField}
            onChange={onChange}
            name='name'
            type='text'
            value={data.name}
            required
          />
        </div>
        <div>
          <TextField
            label='Weight [g]'
            style={style.textField}
            onChange={onChange}
            name='weight'
            type='text'
            value={data.weight}
            required
          />
        </div>
        <div>
          <TextField
            label='Depth [cm]'
            style={style.textField}
            onChange={onChange}
            name='depth'
            type='text'
            value={data.depth}
            required
          />
        </div>
        <div>
          <TextField
            label='Width [cm]'
            style={style.textField}
            onChange={onChange}
            name='width'
            type='text'
            value={data.width}
            required
          />
        </div>
        <div>
          <TextField
            label='Height [cm]'
            style={style.textField}
            onChange={onChange}
            name='height'
            type='text'
            value={data.height}
            required
          />
        </div>
        <div>
          <TextField
            label='Image URL'
            style={style.textField}
            onChange={onChange}
            name='image_url'
            type='text'
            value={data.image_url}
          />
        </div>
        <div>
          <Button
            variant='contained'
            color='secondary'
            style={style.button}
            type='submit'
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
