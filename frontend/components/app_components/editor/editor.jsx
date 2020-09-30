import React from 'react';
import HeaderContainer from './header_container';
import Footer from './footer';

export default class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state= Object.assign({}, this.props.note,{
            noteIds: props.noteIds,
            status: "All changes saved",
        })
        this.timeout = null;
        // Bindings
        this.toggleEditor = this.toggleEditor.bind(this);
        this.autoSave = this.autoSave.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this._formatDate = this._formatDate.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.type === 'standard' && this.props.selectFirst){
            const items = document.getElementsByClassName('note-item')
            if(Array.from(items).length > 0) items[0].classList.add('selected');
        }

        if(prevProps.location.pathname !== this.props.location.pathname){
            if (typeof this.props.note !== 'undefined'){
                Object.keys(this.props.note).forEach(key=>{
                    this.setState({[key]:this.props.note[key]})
                })
                this.setState({noteIds: this.props.noteIds})
            }
        }
    }

    handleChange(field){
        return e => {
            this.setState({status: "Saving..."})
            this.setState({[field]: e.target.value})
            clearTimeout(this.timeout)
            this.timeout = setTimeout(this.autoSave, 1000)
        }
    }

    toolbarToggle(){
        const eles = document.getElementById('toolbar-field').childNodes;
        eles.forEach(ele=>{
            ele.classList.toggle('active');
        })
    }

    autoSave(){
        if(this.state.title === ''){
            this.setState({title: "Untitled"})
        }
        this.props.updateNote(this.state).then(()=> this.setState({status: "All changes saved"}))
    }

    toggleEditor(){
        this.toolbarToggle();
    }

    _formatDate(){
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = new Date(this.state.updated_at)
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    deleteNote(){
        if(this.props.type === "standard")
        {
            const remId = this.state.noteIds.indexOf(this.state.id);
            this.state.noteIds.splice(remId, 1)
            let path = this.props.location.pathname.split('/');
            path.pop();
            this.props.history.push(`${path.join('/')}/${this.state.noteIds[0]}`);
        }
        else{
            this.props.history.push('/app/notebooks');
        }
        this.props.deleteNote(this.state.id)
    }

    render(){
        return(
            <>
            {this.props.note ? <div className="editor">
                <HeaderContainer 
                    deleteNote={this.deleteNote} 
                    note={this.props.note} 
                    formatDate={this._formatDate} />
                <form>
                    <input id="title" type="text" 
                            onChange={this.handleChange('title')} 
                            onBlur={this.autoSave}
                            value={this.state.title === "Untitled" ? "" : this.state.title} 
                            placeholder="Title"/>
                    
                    <textarea  id="body" value={this.state.body}
                                onFocus={this.toggleEditor} 
                                onBlur={this.toggleEditor}
                                onChange={this.handleChange('body')}
                                placeholder="Start writing your note"
                    ></textarea>
                </form>
                <Footer status={this.state.status} />
            </div> : null}
            </>
        )
    }
}