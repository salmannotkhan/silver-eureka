import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import loginimg from "../images/1.png";
import axios from "axios";
import "bulma/css/bulma.min.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setEmailError("");
		setPasswordError("");
		setLoading(true);
		const payload = new FormData(e.target);
		const response = await axios.post("/user/login", payload);
		if (!response.data.success) {
			switch (response.data.type) {
				case "email":
					setEmailError(response.data.error);
					break;
				case "password":
					setPasswordError(response.data.error);
					break;
				default:
			}
		}
		setSuccess(response.data.success);
		setLoading(false);
		console.log(response);
	};

	if (success) return <Redirect to="/admin/panel" />;

	return (
		<div className="hero-body">
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-10">
						<div className="box">
							<form onSubmit={handleLogin}>
								<h3 className="title is-4 has-text-centered">
									Welcome Back !! Login Here :)
								</h3>
								<div className="columns is-vcentered">
									<div className="column is-8">
										<figure className="image is-5by3">
											<img
												src={loginimg}
												alt="Error"></img>
										</figure>
									</div>
									<div className="column">
										<div className="columns is-vcentered">
											<div className="column is-narrow">
												<div className="field">
													<label className="label">
														Email
													</label>
													<div className="control">
														<input
															className={`input ${
																emailError
																	? " is-danger"
																	: ""
															}`}
															type="email"
															required
															placeholder="Email"
															name="email"
															value={email}
															onChange={(e) =>
																setEmail(
																	e.target
																		.value
																)
															}
														/>
													</div>
													{emailError ? (
														<p className="help is-danger">
															{emailError}
														</p>
													) : null}
												</div>
											</div>
										</div>
										<div className="columns is-vcentered">
											<div className="column is-narrow">
												<div className="field">
													<label className="label">
														Password
													</label>
													<div className="control">
														<input
															className={`input ${
																passwordError
																	? " is-danger"
																	: ""
															}`}
															required
															type="password"
															placeholder="Password"
															name="password"
															value={password}
															onChange={(e) =>
																setPassword(
																	e.target
																		.value
																)
															}
														/>
													</div>
													{passwordError ? (
														<p className="help is-danger">
															{passwordError}
														</p>
													) : null}
												</div>
											</div>
										</div>
										<div className="columns is-vcentered has-text-vcentered is-centered">
											<div className="column is-12">
												<div className="field is-grouped">
													<p className="control">
														<button
															type="submit"
															className={`button is-primary is-rounded ${
																loading
																	? "is-loading"
																	: ""
															}`}
															style={{
																color: "#112031",
															}}>
															Login
														</button>
													</p>
													<p className="control mt-2">
														<strong>
															New User?
														</strong>
														<Link
															className="ml-2"
															to="register">
															Click Here
														</Link>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
