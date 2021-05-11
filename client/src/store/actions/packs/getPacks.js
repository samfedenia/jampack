// import axios from 'axios';
// import getToken from '../../utils/getToken';
// import clearToken from '../../utils/clearToken';
// import { setError } from '../error/setError';
// import { clearError } from '../error/clearError';

// // action type
// const GET_PACK = 'GET_PACK';
// // action creator
// const _getPack = (pack) => ({
//   type: GET_PACK,
//   pack,
// });

// // thunk
// const getPack = (pack) => async (dispatch) => {
//   try {
//     dispatch(clearError());
//     const pack = await axios.get(`/api/user/items/packs/${pack.id}`, getToken());
//     console.log(packs.data);
//     if (packs.data.items) dispatch(_getPacks(packs.data.items));
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export { getPacks, GET_PACKS };
