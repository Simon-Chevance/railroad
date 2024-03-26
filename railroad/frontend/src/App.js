import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Axios from "axios";

//Content :
import Home from "./content/Home";
import AdminCards from "./content/AdminCards";

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// Add a request interceptor
		Axios.interceptors.request.use(
			function (config) {
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);

		// Add a response interceptor
		Axios.interceptors.response.use(
			function (response) {
				return response;
			},
			function (error) {
				console.log(error);
				if (error.response.status === 404) {
					alert("Err 404 !\nThis resource does not exist.");
				} else if (error.response.status === 503) {
					alert("Err 503 !\nThis website is under maintenance.");
				} else if (error.response.status === 403) {
					alert("Err 403 !\nYou are not authorized to access this resource.");
				}
				return Promise.reject(error);
			}
		);
	}

	render() {
		return (
			<Router>
				<Routes>
					<Route
						history={this.props.history}
						match={this.props.match}
						path="/Home"
						element={<Home />}
					/>
					<Route
						history={this.props.history}
						match={this.props.match}
						path="/AdminCards"
						element={<AdminCards />}
					/>
					<Route path="*" element={<Navigate replace to="/Home" />} />
				</Routes>
			</Router>
		);
	}
}
