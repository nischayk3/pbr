import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA, TEMPLATE_TILES } from '../../constants/actionTypes';

const initialState = {
    selectedMolecule: '',
    templateData: [],
    templateTiles: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_MOLECULE:
            return { ...state, selectedMolecule: action.payload };
        case TEMPLATE_LOAD_DATA:
            return { ...state, templateData: action.payload };
        case TEMPLATE_TILES:
            return { ...state, templateTiles: action.payload };
        default:
            return state;

    }
};
