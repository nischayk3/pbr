import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA, TEMPLATE_TILES } from "../../constants/actionTypes";

export const sendSelectedMolecule = (payload) => ({
    type: SELECTED_MOLECULE,
    payload
});

export const sendTemplateData = (payload) => ({
    type: TEMPLATE_LOAD_DATA,
    payload
});

export const sendTemplateTiles = (payload) => ({
    type: TEMPLATE_TILES,
    payload
});
