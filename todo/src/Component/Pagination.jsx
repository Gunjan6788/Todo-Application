import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from "uuid"

export class Pagination extends Component {
    constructor(props){
        super(props)

        this.state = {
            curr_page:1
        }
    }

    handleClick = (id) => {
        const { handlePagination } = this.props
        this.setState({
            curr_page:id
        })

        handlePagination(id)
    }

    render() {
        const { todoArr } = this.props
        let { curr_page } = this.state

        let per_page = 5,
            total_page = Math.ceil(todoArr.length / per_page),
            arr = []

        for (let i = 1; i <= total_page; i++) {
            arr.push(i)
        }



        return (
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className = "page-link" onClick={()=> this.handleClick(curr_page > 1 ? curr_page-1 : 1)}>Prev</button>
                        </li>
                        {
                            arr && arr.map(item =>
                                <li key={uuidv4()} className={curr_page===item ? "page-item active": "page-item"}><button className = "page-link" onClick={() =>this.handleClick(item)}>{item}</button></li>
                            )
                        }
                        <li className="page-item">
                            <button className = "page-link" onClick={()=> this.handleClick(curr_page < total_page ? curr_page+1 : total_page)}>Next</button>

                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todoArr: state.todo.todoArr
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
