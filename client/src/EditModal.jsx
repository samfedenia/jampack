import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import EditItemForm from './forms/EditItemForm';

const EditModal = ({ handleClose, show, children }) => {
  const primary = lightGreen[100];
  const secondary = lightGreen[600];
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
      height: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: '1000',
      borderRadius: '1rem',
    },
    button: {
      margin: '.1rem',
      width: '6rem',
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
            <EditItemForm />
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

export default EditModal;
