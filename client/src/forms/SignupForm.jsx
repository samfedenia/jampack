import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Button } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import TermsCheckbox from './TermsCheckbox';
import { createUser } from '../store/actions/user/signup';
import { clearError } from '../store/actions/error/clearError';
import { useHistory } from 'react-router';

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
    marginBottom: '1rem',
  },
  textField: {
    width: '50ch',
    margin: '8px',
  },
  button: {
    margin: '1rem',
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
    marginBottom: '1rem',
  },
  errorText: {
    color: 'red',
  },
};

export default function SignupForm() {
  let timeout;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error !== '') {
      setLoading(false);
    }

    if (user.id) {
      clearTimeout(timeout);
      dispatch(clearError());
      history.push('/account');
    }
  }, [user, error]);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [data, setData] = useState({ email: '', password: '' });

  function toggleButton() {
    setButtonDisabled(!buttonDisabled);
  }
  function onChange(ev) {
    setData({ ...data, [ev.target.name]: ev.target.value });
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setData({ ...data, email: '', password: '' });
    dispatch(createUser({ email: data.email, password: data.password }));
    setLoading(true);
    timeout = setTimeout(() => setLoading(false), 500);
  }

  return (
    <div style={style.root}>
      <form onSubmit={onSubmit} autoComplete='on' style={style.form}>
        <div>
          <Typography variant='h4'>Create an account:</Typography>
        </div>
        {error !== '' && (
          <Typography variant='h6' style={style.errorText}>
            {error}
          </Typography>
        )}
        {loading && <Typography variant='h6'>Loading...</Typography>}
        <div>
          <TextField
            label='Email'
            style={style.textField}
            onChange={onChange}
            name='email'
            type='email'
            value={data.email}
            autoComplete='current-email'
            required
          />
        </div>
        <div>
          <TextField
            label='Password'
            style={style.textField}
            onChange={onChange}
            name='password'
            type='password'
            autoComplete='current-password'
            value={data.password}
            required
          />
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
            type='submit'
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
