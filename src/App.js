import React from 'react';
import './App.css';
import Header from "./Components/Header/Header.jsx";
import Tasks from "./Components/Tasks/Tasks";
import Footer from "./Components/Footer/Footer";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <Header/>
                    <Tasks/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;

