import api from '../../services/api';
import { generateLinkFailure, generateLinkStart, generateLinkSuccess, tokenValidFailure, tokenValidStart, tokenValidSuccess } from './cryptoSlice';

export const generateLink = async (dispatch, values) => {
    dispatch(generateLinkStart());
    try {
      const res = await api.post("core/generate-link", values);
      dispatch(generateLinkSuccess(res.data.token));
      return Promise.resolve(res.data.token);
    } catch (err) {
      dispatch(generateLinkFailure());
      return Promise.reject(err);
    }
  };

  export const decryptLink = async (dispatch, values) => {
    dispatch(generateLinkStart());
    try {
      const res = await api.post("core/decrypt-link", values);
      dispatch(generateLinkSuccess());
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch(generateLinkFailure());
      return Promise.reject(err);
    }
  };

  export const isTokenValid = async (dispatch, token) => {
    dispatch(tokenValidStart());
    try {
      const res = await api.post("core/is-token-valid", {token});
      console.log('res',res);
      dispatch(tokenValidSuccess(token));
      return Promise.resolve(true);
    } catch (err) {
      dispatch(tokenValidFailure());
      return Promise.reject(false);
    }
  };