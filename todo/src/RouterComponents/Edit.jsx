import React from "react";
import { editItem } from "../Redux/Todo/action";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            item: "",
            flag:false,
            inc:"",
            desc:""
		};
    }
    componentDidMount(){
        let {todoArr,match} = this.props
        let item  = todoArr.find(item=>item.id===match.params.id)
        this.setState({
            item:item.item
        })
    }
	handelChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
    };
    handleClick =()=>{
        let {match,editItem} = this.props

        let obj = {
            id:match.params.id,
            value:this.state.item
        }
        editItem(obj)
        this.setState({
            flag:true
        })

    }
	render() {
        console.log(this.props)
        let { todoArr,match} = this.props
        let item  = todoArr.find(item=>item.id===match.params.id)
        
		return (
			<div className=  "col-4 offset-3">
               <p>{item.item}</p>
				<input
					className="form-control"
					name="item"
					value = {this.state.item}
					onChange={this.handelChange}
				/>
                <br></br>
             <button className = "btn btn-danger" onClick ={()=>this.handleClick()}>Update</button> 
             {
                 this.state.flag && <Redirect to = "/todo"/>
             } 
			</div>
		);
	}
}
const MapStateToProps = (state) => {
	return {
		todoArr: state.todo.todoArr,
	};
};

const MapDispatchToProps = (dispatch) => {
	return {
		editItem: (payload) => dispatch(editItem(payload)),
	};
};

export default connect(MapStateToProps, MapDispatchToProps)(Edit);
