import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import AddItemForm from './forms/AddItemForm';

const AddModal = ({ handleClose, show, children }) => {
  const primary = lightGreen[200];
  const secondary = lightGreen[800];
  const styles = {
    root: {
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap',
    },
    modalShow: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'block',
      zIndex: '1010',
    },
    modalHide: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'none',
    },
    modalMain: {
      position: 'fixed',
      background: 'white',
      width: '50%',
      height: '75%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: '1000',
      borderRadius: '1rem',
    },
    button: {
      marginTop: '0',
      width: '10rem',
      backgroundColor: secondary,
    },
    div: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  };

  return (
    <div style={show ? styles.modalShow : styles.modalHide}>
      <Paper elevation={3} variant='outlined' style={styles.root}>
        <section style={styles.modalMain}>
          {children}
          <div style={styles.div}>
            <AddItemForm />
            <Button
              variant='contained'
              color='secondary'
              style={styles.button}
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </section>
      </Paper>
    </div>
  );
};

export default AddModal;
