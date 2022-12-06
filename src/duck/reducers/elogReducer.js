import { SELECTED_MOLECULE, TEMPLATE_LOAD_DATA } from '../../constants/actionTypes';

const initialState = {
    selectedMolecule: '',
    templateData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_MOLECULE:
            return { ...state, selectedMolecule: action.payload };
        case TEMPLATE_LOAD_DATA:
            return { ...state, templateData: action.payload };
        default:
            return state;

    }
};
