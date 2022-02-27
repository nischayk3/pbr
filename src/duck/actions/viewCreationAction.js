import {FUNCTION_TEXT,MOLECULE_ID} from '../types/types';

export const functionTextName = (payload) => ({
    type: FUNCTION_TEXT,
    payload,
  });

  export const moleculeName = (payload) => ({
    type:MOLECULE_ID ,
    payload,
  });