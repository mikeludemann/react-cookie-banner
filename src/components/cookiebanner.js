import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './cookiebanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Cookiebanner extends Component {
	constructor(props){
		super(props)
		this.state = {
			hoverDataSecurity: false,
			hoverAccept: false
		}

		this.dataSecurityVisible = this.dataSecurityVisible.bind(this);
		this.dataSecurityNotVisible = this.dataSecurityNotVisible.bind(this);
		this.acceptVisible = this.acceptVisible.bind(this);
		this.acceptNotVisible = this.acceptNotVisible.bind(this);
	}

	dataSecurityVisible() {
		this.setState({ hoverDataSecurity: true })
	}

	dataSecurityNotVisible() {
		this.setState({ hoverDataSecurity: false })
	}

	acceptVisible() {
		this.setState({ hoverAccept: true })
	}

	acceptNotVisible() {
		this.setState({ hoverAccept: false })
	}

	componentDidMount(){
		var cookie = {

			set: function (cname, cvalue, days, path) {
				var d = new Date();
				d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
			},

			get: function (cname) {
				var name = cname + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			},

			check: function (cname) {
				var cookieName = this.get(cname);
				if (cookieName != "") {
					console.log(cookieName + " - Cookie is available");
				} else {
					console.log("Cookie is not available");
				}
			},

			remove: function (cname) {
				this.set(cname, "", -1);
				console.log("Cookie has been removed");
			},

			getAll: function () {
				var cookies = document.cookie(";");
				var text = "";
				for(var i = 1; i <= cookies.length; i++){
					text += i + ": " + cookies[i-1] + "\n";
				}
				return console.log(text);
			}

		};

		const nameCookie = this.props.nameCookie;
		const activeDays = this.props.activeDays;

		if(document.cookie.indexOf(nameCookie + '=active') != -1){

			document.getElementById("cookie--banner").style.display = "none";

		} else {

			document.body.prepend(document.getElementById("cookie--banner"));
			document.getElementById("close--banner").style.display = "block";

		}

		document.getElementById("close--banner").addEventListener("click", function(){

			cookie.set(nameCookie, "active", activeDays);
			document.getElementById('cookie--banner').style.display = 'none';

		});

		if(this.props.position == "top"){

			document.getElementById("cookie--banner").style.top = "0px";

		} else if(this.props.position == "bottom"){

			document.getElementById("cookie--banner").style.bottom = "0px";

		} else {

			document.getElementById("cookie--banner").style.top = "0px";

		}

	}

	render() {
		const Link = {
			color: this.props.color || "#000"
		}

		const Banner = {
			color: this.props.color || "#fff",
			backgroundColor: this.props.bgcolor || "#222"
		}

		const ButtonDataSecurity = {
			backgroundColor: this.state.hoverDataSecurity ? this.props.bgcolorhover : this.props.color || "#000",
			color: this.state.hoverDataSecurity ? this.props.colorhover : this.props.bgcolor || "#fff",
			border: "0.5px solid " + this.props.bgcolor || "0.5px solid #fff",
			textShadow: "0 1px 0 " + this.props.bgcolor || "0 1px 0 #fff",
		}

		const ButtonAccept = {
			backgroundColor: this.state.hoverAccept ? this.props.bgcolorhover : this.props.color || "#000",
			color: this.state.hoverAccept ? this.props.colorhover : this.props.bgcolor || "#fff",
			border: "0.5px solid " + this.props.bgcolor || "0.5px solid #fff",
			textShadow: "0 1px 0 " + this.props.bgcolor || "0 1px 0 #fff",
		}

		return (
			<div className="container-fluid" id="cookie--banner" style={Banner}>
				<div className="row">
					<div className="col-12 cookie--text">
						<span>{this.props.message}</span> 
					</div>
				</div>
				<div className="row cookie--info">
					<div className="col-6">
						<a href={this.props.dataSecurityLink} style={Link} onMouseOver={this.dataSecurityVisible} onMouseOut={this.dataSecurityNotVisible}>
							<div id="data--security" style={ButtonDataSecurity}>
								<span>
									{this.props.dataSecurity}
								</span>
							</div>
						</a>
					</div>
					<div className="col-6">
						<div id="close--banner" style={ButtonAccept} onMouseOver={this.acceptVisible} onMouseOut={this.acceptNotVisible}>
							<span>
								{this.props.accept}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Cookiebanner.propTypes = {
	nameCookie: PropTypes.string.isRequired,
	activeDays: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	bgcolor: PropTypes.string.isRequired,
	colorhover: PropTypes.string.isRequired,
	bgcolorhover: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	dataSecurity: PropTypes.string.isRequired,
	dataSecurityLink: PropTypes.string.isRequired,
	accept: PropTypes.string.isRequired,
	position: PropTypes.oneOf(['top', 'bottom'])
}

export {
	Cookiebanner
}
