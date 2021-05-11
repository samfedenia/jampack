import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

function AllItems(props) {
  const items = props.items;
  return <div>{items[0]}</div>;
}

export default AllItems;
