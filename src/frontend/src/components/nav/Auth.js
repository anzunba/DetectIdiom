import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getProfile } from '../../actions/getRequestUserProfile';

class Auth extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};

	componentDidUpdate() {
		const { isAuthenticated } = this.props.auth;
		isAuthenticated?this.props.getProfile():'';
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;
		
		const authLinks = (
			<ul className="mb-0  align-self-center">
				<li className="list-inline-item">
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.username}` : ''}</strong>
					</span>
				</li>
				<li className="list-inline-item">
					<span onClick={this.props.logout} className="nav-link">
						Logout
					</span>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
				<li className="nav-item">
					<Link to="/register" className="nav-link">
						Register
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</li>
			</ul>
		);

		return <React.Fragment>{isAuthenticated ? authLinks : guestLinks}</React.Fragment>;
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout, getProfile })(Auth);
