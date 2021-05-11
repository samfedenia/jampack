// import axios from 'axios';
// import getToken from '../../utils/getToken';

// // action type
// const ADD_ITEM_TO_PACK = 'ADD_ITEM_TO_PACK';
// // action creator
// const _addItemToPack = (item) => ({
//   type: ADD_ITEM_TO_PACK,
//   item,
// });

// // thunk
// const addItemToPack = (item, parentItem) => async (dispatch) => {
//   try {
//     await axios.put(
//       `/api/user/items/${item.id}/addToPack`,
//       { parentItemId: parentItem.id },
//       getToken()
//     );
//     dispatch(_addItemToPack(item));
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export { addItemToPack, ADD_ITEM_TO_PACK };
