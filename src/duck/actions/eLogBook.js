import { SELECTED_MOLECULE, SELECTED_PRODUCT_SITE, TEMPLATE_REQ, TEMPLATE_TILES } from "../../constants/actionTypes";

export const sendSelectedMolecule = (payload) => ({
	type: SELECTED_MOLECULE,
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
