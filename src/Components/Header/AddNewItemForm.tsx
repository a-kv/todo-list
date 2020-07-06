import * as  React from 'react';

type OwnPropsType = {
    addItem: (newText: string) => void
    id?: string //??

}
type StateType = {
    error: boolean
    title: string
}


class AddNewItemForm extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        error: false,
        title: ''
    }
    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        this.setState({title: ""}); //проверка на пустую строку
        if (newTitle === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addItem(newTitle); //???
        }
    };
    onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };
    onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            return this.onAddItemClick()
        }

    }

    render = () => {
        let errorClass = this.state.error ? 'error' : '';
        return (
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
        );
    }
}

export default AddNewItemForm;
