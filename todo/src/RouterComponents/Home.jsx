import React from "react";
import { authUser } from "../Redux/Auth/action";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleClick = () => {
		const { username, password } = this.state
		const { authUser } = this.props

		if (username === 'admin' && password === 'admin') {
			authUser(true)
		}
	}

	render() {
		const { isAuth } = this.props

		return (
			<div className="container">
				<h3 className="text-center m-3">Login</h3>

				<div className="border row offset-3 col-md-6 p-3 shadow-lg p-3 mb-5 bg-white rounded border border-info">
					<div className='col-12'>
						<div className="form-group col-12">
							<input className="form-control"
								name="username"
								type="text"
								value={this.state.username}
								onChange={this.handleChange}
								placeholder="username" />
						</div>
						<div className="form-group col-12">
							<input className="form-control"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.handleChange}
								placeholder="password" />
						</div>
					</div>

					<button className='btn btn-info ml-5 mt-3' onClick={this.handleClick}>Login</button>
				</div>
				{
					isAuth && <Redirect to='/todo' />
				}
			</div>

		);
	}
}

const MapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	}
}

const MapDispatchToProps = dispatch => {
	return {
		authUser: payload => dispatch(authUser(payload))
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(Home)
