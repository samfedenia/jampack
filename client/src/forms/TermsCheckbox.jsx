import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';

export default function TermsCheckbox(props) {
  const style = {
    checkbox: {
      color: 'green',
    },
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.toggleButton();
  };

  return (
    <FormControl component='fieldset'>
      <FormControlLabel
        value={true}
        control={
          <Checkbox
            style={style.checkbox}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label='Agree to terms: '
        labelPlacement='start'
      />
    </FormControl>
  );
}
