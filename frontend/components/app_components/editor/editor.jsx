import React from 'react';

export default class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            note: {title:""},
            autoSave: "",
            test: "testing"
        }
        this.selectTextarea = this.selectTextarea.bind(this);
        this.leaveTextarea = this.leaveTextarea.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.note.id !== this.props.note.id){
            const {note} = this.props
            this.setState({note})
        }
    }

    handleChange(field){
        return e => {
            this.setState({note:{[field]:e.target.value}})
            console.log(field);
            console.log(e.target.value);
            if(field === "title")
            {
                this.autoSave();
            }
        }
    }

    toolbarToggle(){
        const eles = document.getElementById('toolbar-field').childNodes;
        eles.forEach(ele=>{
            ele.classList.toggle('active');
        })
    }

    autoSave(){
        this.props.updateNote(this.state.note)
    }

    selectTextarea(){
        this.toolbarToggle()
    }

    leaveTextarea(){
        this.toolbarToggle()
    }

    formatDate(){
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = new Date(this.state.note.updated_at)
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    test(e){
        this.setState({test:e.target.value})
    }

    render(){
        return(
            <div className="editor">
                <div className="header">
                    <div id="toolbar-field">
                        <p className="display active">Last edited on {this.formatDate()}</p>
                        <nav className="toolbar">
                            {/* Rich text editing toolbar goes here */}
                            <img src={window.editing} alt=""/>
                        </nav>
                    </div>
                </div>
                <form>
                    <input id="title" type="text" onChange={this.handleChange('title')} value={this.state.note.title} placeholder="Title"/>
                    <input type="text" onChange={this.test} value={this.state.test}/>
                    <textarea  id="body" value={this.state.note.body}
                                // onFocus={this.selectTextarea} 
                                // onBlur={this.leaveTextarea}
                                onChange={this.handleChange('body')}
                                  ></textarea>
                </form>
            </div>
            )
    }
}