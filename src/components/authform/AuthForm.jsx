import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";
// import ScreenLoader from "../loader/ScreenLoader";

const AuthForm = () => {
	// const forTesting = "http://localhost:8000";
	const forDeploying = "https://blogtime-app-shahriar.onrender.com";

	const [isSignup, setIsSignup] = useState(false);
	const [isCreated, setIsCreated] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: object({
			name: string().min(4, "Minimum 4 characters long"),
			email: string().email("Must be valid email").required(),
			password: string().min(6, "Minimum 6 characters long").required(),
		}),
		onSubmit: (values, { resetForm }) => {
			setIsCreated(true);
			const sendRequest = async (type = "login") => {
				const response = await axios
					.post(`${forDeploying}/api/v1/${type}`, {
						...values,
					})
					.catch((error) => console.log(error));
				const data = await response.data;
				console.log(data);
				localStorage.setItem("userId", data._id);
				return data;
			};
			if (isSignup) {
				sendRequest("register").then((data) => {
					console.log(data);
					//loader
					toast.success("Successfully Registered");
					setIsSignup(false);
				});
			} else {
				const requestData = sendRequest();
				if (requestData) {
					dispatch(login());
					setIsCreated(false);
					toast.success("Welcome!");
					navigate("/blogs-feed");
				}
			}
			resetForm({
				values: "",
			});
		},
	});
	return (
		<>
			<div className="container">
				<form className="form-group" onSubmit={formik.handleSubmit}>
					<div className="row d-flex justify-content-center">
						<div className="col-lg-6">
							<div className="card p-5">
								<h1 className="card-title mb-4 text-center">
									{!isSignup ? "Login" : "Sign Up"}
								</h1>
								{isSignup && (
									<>
										<input
											type="text"
											className="form-control my-2 py-3"
											placeholder="Name"
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
										/>
										{formik.touched.name &&
											formik.errors.name && (
												<span className="text-danger my-1 ms-2">
													&#9432; {formik.errors.name}
												</span>
											)}
									</>
								)}

								<input
									type="email"
									className="form-control my-2 py-3"
									placeholder="Email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
								{formik.touched.email &&
									formik.errors.email && (
										<span className="text-danger my-1 ms-2">
											&#9432; {formik.errors.email}
										</span>
									)}
								<input
									type="password"
									className="form-control my-2 py-3"
									placeholder="Password"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
								{formik.touched.password &&
									formik.errors.password && (
										<span className="text-danger my-1 ms-2">
											&#9432; {formik.errors.password}
										</span>
									)}
								<button
									type="submit"
									className="btn bg-gradient-primary my-2"
								>
									{!isSignup ? "Login" : "Signup"}
								</button>
								<p
									onClick={() => {
										setIsSignup(!isSignup);
									}}
									className="text-center mt-2"
								>
									{isSignup
										? "Already have an account?"
										: "Don't have an account?"}{" "}
									<Link className="text-info" to="/">
										{isSignup ? "Login" : "Signup"}
									</Link>
								</p>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default AuthForm;
