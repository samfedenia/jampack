import React, { useEffect, useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from './store/actions/items/getItems';
import { setItem } from './store/actions/items/setItem';
import { deleteItem } from './store/actions/items/deleteItem';
import { getPacks } from './store/actions/packs/getPacks';
import AddModal from './AddModal.jsx';

import AddToPackSelect from './forms/AddToPackSelect';

const primary = lightGreen[100];
const secondary = lightGreen[600];
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
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    marginTop: '3rem',
    marginBottom: '1rem',
    fontFamily: 'Roboto',
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
    margin: '25px 0',
    fontFamily: 'sans-serif',
    minWidth: '400px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
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
      verticalAlign: 'middle',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      align: 'center',
      button: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: '6rem',
        backgroundColor: secondary,
      },
    },
  },
  th: {
    position: 'sticky',
    zIndex: '50',
    top: '0',
    backgroundColor: secondary,
    color: 'white',
    border: '1px solid black',
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)',
    borderRadius: '0.2rem',
    padding: '0.4rem',
  },
};

function Profile() {
  const items = useSelector((state) => state.items);
  const [showAddModal, setShowAddModal] = useState(false);
  const packs = [...items].filter((item) => item.category === 'Pack');
  // const packsFromState = useSelector((state) => state.packs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(getPacks());
  }, []);

  function toggleShowAddModal() {
    setShowAddModal(true);
  }

  function toggleHideAddModal() {
    setShowAddModal(false);
  }

  function toggleHideEditModal() {
    setShowEditModal(false);
  }

  return (
    <>
      <Paper elevation={3} variant='outlined' style={style.root}>
        <AddModal
          show={showAddModal}
          handleClose={toggleHideAddModal}
        ></AddModal>

        <div style={style.div}>
          <Typography variant='h3' style={style.text}>
            Inventory
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            style={{
              marginTop: '.1rem',
              width: '12rem',
              backgroundColor: secondary,
            }}
            onClick={toggleShowAddModal}
          >
            Add item
          </Button>
          {items.length > 0 && (
            <Typography variant='h6' style={style.text}>
              <table style={style.table}>
                <thead style={style.tr}>
                  <tr>
                    <th style={style.th}>Add To Pack</th>
                    <th style={style.th}>Name</th>
                    <th style={style.th}>Category</th>
                    <th style={style.th}>Weight [g]</th>
                    <th style={style.th}>Depth [cm]</th>
                    <th style={style.th}>Width [cm]</th>
                    <th style={style.th}>Height [cm]</th>
                    <th style={style.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, id) => (
                    <tr key={id} style={style.tr}>
                      <td style={style.td}>
                        {item.category !== 'Pack' ? (
                          <AddToPackSelect packs={packs} item={item} />
                        ) : (
                          <div style={{ width: '2rem' }}>{'    '}</div>
                        )}
                      </td>
                      {item.category !== 'Pack' ? (
                        <td style={style.td}>{item.name}</td>
                      ) : (
                        <td style={style.td}>
                          <RouteLink
                            to={{
                              pathname: '/pack',
                              hash: `#${item.id}`,
                            }}
                          >
                            {item.name}
                          </RouteLink>
                        </td>
                      )}

                      <td style={style.td}>{item.category}</td>
                      <td style={style.td}>{item.weight}</td>
                      <td style={style.td}>{item.depth}</td>
                      <td style={style.td}>{item.width}</td>
                      <td style={style.td}>{item.height}</td>
                      <td style={style.td.actions}>
                        <div>
                          <Button
                            variant='contained'
                            color='secondary'
                            style={style.td.actions.button}
                            onClick={() => dispatch(deleteItem(item))}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Typography>
          )}
        </div>
      </Paper>
    </>
  );
}

export default Profile;
