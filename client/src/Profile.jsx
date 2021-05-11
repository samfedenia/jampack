import React, { useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from './store/actions/items/getItems';

const primary = lightGreen[200];
const secondary = lightGreen[800];
const style = {
  div: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  link: {
    paddingTop: '1rem',
    paddingBottom: '2rem',
    color: secondary,
  },
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    marginTop: '3rem',
    marginBottom: '1rem',
  },
  button: {
    margin: '.1rem',
    width: '6rem',
    backgroundColor: secondary,
  },
  table: {
    backgroundColor: primary,
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',
    borderRadius: '0.2rem',
    padding: '0.4rem',
  },
  tr: {
    border: '1px solid black',
    borderRadius: '0.2rem',
    padding: '0.4rem',
  },
  td: {
    fontSize: '1.4rem',
    border: '1px solid black',
    borderRadius: '0.2rem',
    padding: '0.4rem',
    actions: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  th: {
    position: 'sticky',
    zIndex: '50',
    top: '0',
    backgroundColor: secondary,
    color: 'white',
    border: '1px solid black',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)',
    borderRadius: '0.2rem',
    padding: '0.4rem',
  },
};

let count = 0;
function Profile() {
  const items = useSelector((state) => state.items);
  const packs = [...items].filter((item) => item.category === 'Pack');
  const dispatch = useDispatch();
  useEffect(() => {
    if (items.length === 0 || count < 1) {
      dispatch(getItems());
      count++;
    }
  }, [items]);
  console.log(items);

  return (
    <Paper elevation={3} variant='outlined' style={style.root}>
      <div style={style.div}>
        <Typography variant='h3' style={style.text}>
          Inventory
        </Typography>
        <Button variant='contained' color='secondary' style={style.button}>
          Add item
        </Button>
        <Typography variant='h8' style={style.text}>
          <table style={style.table}>
            <tr style={style.tr}>
              <th style={style.th}>Name</th>
              <th style={style.th}>Category</th>
              <th style={style.th}>Weight</th>
              <th style={style.th}>Length [cm]</th>
              <th style={style.th}>Width [cm]</th>
              <th style={style.th}>Height [cm]</th>
              <th style={style.th}>Actions</th>
            </tr>
            {items.map((item, id) => (
              <tr key={id} style={style.tr}>
                <td style={style.td}>{item.name}</td>
                <td style={style.td}>{item.category}</td>
                <td style={style.td}>{item.weight}</td>
                <td style={style.td}>{item.length}</td>
                <td style={style.td}>{item.width}</td>
                <td style={style.td}>{item.height}</td>
                <td style={style.td.actions}>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={style.button}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={style.button}
                  >
                    Edit
                  </Button>
                  {item.category !== 'Pack' && (
                    <div>
                      <Button
                        variant='contained'
                        color='secondary'
                        style={style.button}
                      >
                        Add to pack
                      </Button>
                      <select style={{ padding: '.5rem' }}>
                        {packs.map((pack, id) => (
                          <option key={id}>{pack.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </Typography>
      </div>
    </Paper>
  );
}

export default Profile;
