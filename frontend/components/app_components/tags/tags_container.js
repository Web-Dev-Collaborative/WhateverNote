import { connect } from "react-redux";
import Tags from './tags';
import { closeModal } from '../../../actions/modal_actions';

const mSTP = state => ({
    tags: Object.values(state.entities.tags).sort((a,b) => a.name > b.name ? 1 : -1),
    show: state.ui.modal !== null && state.ui.modal.type === 'tags'
})

const mDTP = dispatch => ({
    close: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Tags)