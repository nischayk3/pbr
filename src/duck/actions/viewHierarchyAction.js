import { DRUG_SUBSTANCE, DRUG_LOAD } from '../../constants/actionTypes'


export const sendDrugSub = (payload) => ({
  type: DRUG_SUBSTANCE,
  payload,
});

export const loadDrug = (payload) => ({
  type: DRUG_LOAD,
  payload,
});

