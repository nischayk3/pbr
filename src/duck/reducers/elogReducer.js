import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA, TEMPLATE_TILES, SELECTED_PRODUCT_SITE, TEMPLATE_REQ } from '../../constants/actionTypes';

const initialState = {
    selectedMolecule: '',
    templateData: [],
    templateTiles: [],
    templateReq: {},
    selectedProductSite: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_MOLECULE:
            return { ...state, selectedMolecule: action.payload };
        case TEMPLATE_LOAD_DATA:
            return { ...state, templateData: action.payload };
        case TEMPLATE_TILES:
            return { ...state, templateTiles: action.payload };
        case SELECTED_PRODUCT_SITE:
            return { ...state, selectedProductSite: action.payload };
        case TEMPLATE_REQ:
            return { ...state, templateReq: action.payload };
        default:
            return state;

    }
};
