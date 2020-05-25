import React from 'react';

class AddNewItemForm extends React.Component {
    state={
        error: true,
        title: ''
    }
    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        this.state.title = ""; //проверка на пустую строку
        if (newTitle === "") {
            this.setState({error: true});
        }else{
            this.setState( {error: false});
            this.props.addItem(newTitle);
        }
    };
    onTitleChange = (e) => {
           this.setState({
               error: false,
               title: e.currentTarget.value
           });
        };
    onKeyPress = (e) => {
        if(e.key === 'Enter'){
            return this.onAddItemClick()
        }

    }

    render = (props) => {
        let errorClass = this.state.error ? 'error': '';
        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input
                        onChange={this.onTitleChange}
                        className={errorClass}
                        type="text"
                        placeholder="New-item-name"
                        onKeyPress={this.onKeyPress}
                        value={this.state.title}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>
        );
    }
}
    export default AddNewItemForm;
