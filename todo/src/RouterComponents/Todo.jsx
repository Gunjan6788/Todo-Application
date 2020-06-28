import React from "react";
import { addTodo, editItem, delItem, checkBox, clearCompleteTask } from "../Redux/Todo/action"
import { authUser } from "../Redux/Auth/action"
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import Pagination from '../Component/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            curr_page: 1,
            flag: false
        };
    }

    handlePagination = (item) => {
        console.log(item)
        this.setState({
            curr_page: item
        })
    }

    handelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleClick = () => {
        const { addTodo } = this.props;
        const { item } = this.state;

        var obj = {
            item: item,
            id: uuidv4(),
        };
        addTodo(obj);
    }

    handleCheckBox = (e, id) => {
        // e.target.nextSibling.style.color = "green"
        // e.target.nextSibling.style.textDecoration = "line-through"
        checkBox(id)

        // setTimeout(() => {
        //     checkBox(id)
        // }, 4000);
    }

    handleCompletedTask = () => {
        const { flag } = this.state
        this.setState({
            flag: !flag
        })
    }

    render() {
        let { todoArr, delItem, checkBox, cartArr, authUser, isAuth, clearCompleteTask } = this.props;
        const { curr_page, flag } = this.state

        let per_page = 5,
            start_index = per_page * (curr_page - 1),
            end_index = curr_page * per_page - 1

        let arr = todoArr.slice(start_index, end_index + 1)
        console.log(arr)
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6" style={{ height: "860px", backgroundColor: "#FFB74D" }}>
                        <h3 className="text-primary float-right p-2">Todo </h3>

                        <div className="m-md-5 m-sm-2">
                            <input
                                placeholder="Add item"
                                className="form-control p-4"
                                name="item"
                                value={this.state.item}
                                onChange={this.handelChange}
                            />
                            <button className="btn btn-primary m-3 pl-4 pr-4" onClick={this.handleClick}>Add</button>
                        </div>

                        <div className="m-md-5 m-sm-2">
                            {arr &&
                                arr.map((item) => (
                                    <div className="col-12 card">
                                        <div className="row p-3 h4" key={item.id}>
                                            <div className="col-1">
                                                <input onClick={() => checkBox(item.id)} type="checkbox" style={{ width: "20px", height: "20px" }}></input>
                                            </div>
                                            <div className="col-6" >
                                                <p>{item.item}</p>
                                            </div>
                                            <div className="col-2">
                                                <Link to={`/todo/edit/${item.id}`}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                            </div>
                                            <div className="col-2">
                                                <FontAwesomeIcon icon={faTrash} onClick={() => delItem(item.id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>
                        {
                            todoArr.length > 0 &&
                            <div className="m-5 d-flex justify-content-center">
                                <Pagination handlePagination={this.handlePagination} />
                            </div>
                        }
                    </div>

                    <div className="col-6 pt-md-2 pl-md-4 pb-md-5 p-sm-2" style={{ height: "860px", backgroundColor: "#CDDC39" }}>
                        <div className="clearfix">
                            <h3 className="text-primary float-left">Application </h3>
                            <button className="btn btn-danger float-right mb-3 " onClick={() => authUser(false)}>LogOut</button>
                        </div>
                        <div >
                            <button className="btn btn-primary" onClick={this.handleCompletedTask}>Show Completed Task</button>
                        </div>

                        {
                            flag &&
                            <div className="row h4 p-2">
                                <div className="offset-1 col-10">

                                    <div className="">
                                        {
                                            cartArr && cartArr.map(item =>
                                                <>
                                                    <div >
                                                        <p style={{ textDecoration: 'line-through', color: "green" }}>{item.item}</p>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <FontAwesomeIcon icon={faTrash} onClick={() => clearCompleteTask()} />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            !isAuth ? <Redirect to='/'/>:""
                        }
                    </div>
                </div>

            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        todoArr: state.todo.todoArr,
        cartArr: state.todo.cartArr,
        isAuth: state.auth.isAuth
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
        addTodo: (payload) => dispatch(addTodo(payload)),
        editItem: (payload) => dispatch(editItem(payload)),
        delItem: (payload) => dispatch(delItem(payload)),
        checkBox: (payload) => dispatch(checkBox(payload)),
        authUser: (payload) => dispatch(authUser(payload)),
        clearCompleteTask: (payload) => dispatch(clearCompleteTask(payload))
    };
};

export default connect(MapStateToProps, MapDispatchToProps)(Todo);
