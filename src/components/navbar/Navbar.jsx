import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { AiFillAlert, AiOutlinePlus } from "react-icons/ai";
import ScreenLoader from "../loader/ScreenLoader";

const NavMenu = () => {
	const [isLoading, setIsLoading] = useState(false);
	const isLoggedIn = useSelector((state) => {
		return state.auth.isLoggedIn;
	});
	const dispatch = useDispatch();

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					{" "}
					<h1 className="navbar-brand logo text-primary">
						<AiFillAlert className="mb-2" /> BlogTime
					</h1>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						{" "}
						<span className="navbar-toggler-icon" />{" "}
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarTogglerDemo02"
					>
						<ul className="navbar-nav ms-auto">
							{isLoggedIn && (
								<>
									<li className="nav-item me-3 mt-3 text-center pt-2">
										<NavLink
											to="/blogs-feed"
											className={({ isActive }) =>
												isActive
													? "active-link nav-link"
													: "pending-link nav-link"
											}
										>
											Blogs Feed
										</NavLink>{" "}
									</li>

									<li className="nav-item me-3 mt-3 text-center pt-2">
										<NavLink
											to="/user-blogs"
											className={({ isActive }) =>
												isActive
													? "active-link nav-link"
													: "pending-link nav-link"
											}
										>
											My Blogs
										</NavLink>{" "}
									</li>

									<li className="nav-item me-2 mt-1 pt-2">
										{" "}
										<NavLink
											to="/create-blog"
											className={({ isActive }) =>
												isActive
													? "active-link nav-link"
													: "pending-link nav-link"
											}
										>
											<button className="btn bg-gradient-primary">
												<AiOutlinePlus className="plus" />{" "}
												Create Blog
											</button>
										</NavLink>{" "}
									</li>
								</>
							)}
							{!isLoggedIn && (
								<>
									<li className="nav-item me-2 mt-1">
										{" "}
										<NavLink
											to="/"
											className={({
												isActive,
												isPending,
											}) =>
												isActive
													? "active-link nav-link"
													: "pending-link nav-link"
											}
										>
											<button className="btn btn-primary">
												Login
											</button>
										</NavLink>{" "}
									</li>

									{/* <li className="nav-item me-2 mt-1">
									{" "}
									<NavLink
										to="/"
										className={({ isActive, isPending }) =>
											isActive
												? "active-link nav-link"
												: "pending-link nav-link"
										}
									>
										<button
											onClick={() => {}}
											className="btn btn-info"
										>
											Signup
										</button>
									</NavLink>{" "}
								</li> */}
								</>
							)}

							{isLoggedIn && (
								<li className="nav-item me-2 mt-1 pt-2">
									{" "}
									<NavLink
										to="/"
										className={({ isActive, isPending }) =>
											isActive
												? "active-link nav-link"
												: "pending-link nav-link"
										}
									>
										<button
											onClick={() => {
												dispatch(logout());
												// setIsLoading(true);
											}}
											className="btn btn-outline-warning"
										>
											Logout
										</button>
									</NavLink>{" "}
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
			{isLoading && <ScreenLoader />}
		</>
	);
};

export default NavMenu;
