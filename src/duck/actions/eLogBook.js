import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA } from "../../constants/actionTypes";

export const sendSelectedMolecule = (payload) => ({
    type: SELECTED_MOLECULE,
    payload
});

export const sendTemplateData = (payload) => ({
    type: TEMPLATE_LOAD_DATA,
    payload
});
