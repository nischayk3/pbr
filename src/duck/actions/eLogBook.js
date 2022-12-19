import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA, TEMPLATE_TILES, SELECTED_PRODUCT_SITE, TEMPLATE_REQ } from "../../constants/actionTypes";

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

export const sendProductSite = (payload) => ({
    type: SELECTED_PRODUCT_SITE,
    payload
});

export const sendTemplateReq = (payload) => ({
    type: TEMPLATE_REQ,
    payload
});

