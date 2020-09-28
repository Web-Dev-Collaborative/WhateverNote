import React from 'react';
import SidebarContainer from './app_components/side_bar/side_bar_container';
import NotesIndexContainer from './app_components/notes_index/notes_index_container';
import {ProtectedRoute} from '../util/route_util';
import Modal from './modals/modal'
import NotebooksIndexContainer from './app_components/notebooks_index/notebooks_index_container';
import NotebookNotesIndexContainer from './app_components/notes_index/notebook_notes_index_container';
import { Switch } from 'react-router-dom';
import EditorOnlyContainer from './app_components/editor/editor_only_container';

export default function App(){
    return(
        <div className="app">
            <Modal />
            <SidebarContainer/>
            <Switch>
                <ProtectedRoute path='/app/notes' component={NotesIndexContainer} />
                <ProtectedRoute path='/app/notebooks/:notebook_id/notes' component={NotebookNotesIndexContainer} />
                <ProtectedRoute path='/app/notebooks' component={NotebooksIndexContainer} />
                <ProtectedRoute path='/app/editor/:note_id' component={EditorOnlyContainer} />
            </Switch>
        </div>
    )
}