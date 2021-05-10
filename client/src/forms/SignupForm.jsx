import React, { useState } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import TermsCheckbox from './TermsCheckbox';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    width: '50ch',
  },
  button: {
    margin: '1rem',
    width: '10rem',
    backgroundColor: 'green',
  },
};

export default function SignupForm() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function toggleButton() {
    setButtonDisabled(!buttonDisabled);
  }
  return (
    <div style={style.root}>
      <div>
        <Typography variant='h4'>Create an account:</Typography>
      </div>
      <div>
        <TextField label='Email' id='margin-none' style={style.textField} />
      </div>
      <div>
        <TextField label='Password' id='margin-none' style={style.textField} />
      </div>
      <div>
        <TermsCheckbox toggleButton={toggleButton} />
      </div>
      <div>
        <Button
          disabled={buttonDisabled}
          variant='contained'
          color='secondary'
          style={style.button}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
