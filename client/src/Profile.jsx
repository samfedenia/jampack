import React, { useEffect, useRef, useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from './store/actions/items/getItems';
import { setItem } from './store/actions/items/setItem';
import { deleteItem } from './store/actions/items/deleteItem';
import AddModal from './AddModal.jsx';
import EditModal from './EditModal.jsx';

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
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)',
    borderRadius: '0.2rem',
    padding: '0.4rem',
  },
};

function Profile() {
  // const ref = useRef(0);
  // const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const packs = [...items].filter((item) => item.category === 'Pack');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  function toggleShowAddModal() {
    setShowAddModal(true);
  }

  function toggleHideAddModal() {
    setShowAddModal(false);
  }
  function toggleShowEditModal(item) {
    dispatch(setItem(item));
    setShowEditModal(true);
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
        <EditModal
          show={showEditModal}
          handleClose={toggleHideEditModal}
          children={null}
        ></EditModal>
        <div style={style.div}>
          <Typography variant='h3' style={style.text}>
            Inventory
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            style={{
              margin: '.1rem',
              width: '12rem',
              backgroundColor: secondary,
            }}
            onClick={toggleShowAddModal}
          >
            Add item
          </Button>
          <Typography variant='h6' style={style.text}>
            <table style={style.table}>
              <thead style={style.tr}>
                <tr>
                  <th style={style.th}>Name</th>
                  <th style={style.th}>Category</th>
                  <th style={style.th}>Weight</th>
                  <th style={style.th}>Length [cm]</th>
                  <th style={style.th}>Width [cm]</th>
                  <th style={style.th}>Height [cm]</th>
                  <th style={style.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
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
                        onClick={() => dispatch(deleteItem(item))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant='contained'
                        color='secondary'
                        style={style.button}
                        onClick={() => toggleShowEditModal(item)}
                        disabled
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
              </tbody>
            </table>
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default Profile;
