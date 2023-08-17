import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";

// import LogInOutPage from "./pages/logInOut/LogInOutPage";
// import CreateBlogPage from "./pages/createblog/CreateBlogPage";
// import HomeBlogPage from "./pages/homeblogs/HomeBlogPage";
// import BlogByIdPage from "./pages/blogbyid/BlogByIdPage";
// import UserBlogPage from "./pages/userblogs/UserBlogPage";
// import UpdateBlog from "./components/updateblog/UpdateBlog";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "./redux/features/authSlice";
import ScreenLoader from "./components/loader/ScreenLoader";

const LogInOutPage = lazy(() => import("./pages/logInOut/LogInOutPage"));
const CreateBlogPage = lazy(() => import("./pages/createblog/CreateBlogPage"));
const HomeBlogPage = lazy(() => import("./pages/homeblogs/HomeBlogPage"));
const BlogByIdPage = lazy(() => import("./pages/blogbyid/BlogByIdPage"));
const UserBlogPage = lazy(() => import("./pages/userblogs/UserBlogPage"));
const UpdateBlog = lazy(() => import("./components/updateblog/UpdateBlog"));

const App = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => {
		return state.auth.isLoggedIn;
	});
	// console.log(isLoggedIn);
	useEffect(() => {
		if (localStorage.getItem("userId")) {
			dispatch(login());
		}
	}, [dispatch]);
	return (
		<BrowserRouter>
			<NavBar />
			<Suspense fallback={<ScreenLoader />}>
				<Routes>
					{!isLoggedIn ? (
						<Route path="/" element={<LogInOutPage />} />
					) : (
						<>
							<Route
								path="/blogs-feed"
								element={<HomeBlogPage />}
							/>
							<Route
								path="/user-blogs"
								element={<UserBlogPage />}
							/>
							<Route
								path="/create-blog"
								element={<CreateBlogPage />}
							/>
							<Route
								path="/blog/:id"
								element={<BlogByIdPage />}
							/>
							<Route
								path="/blog/update/:id"
								element={<UpdateBlog />}
							/>
						</>
					)}
				</Routes>
			</Suspense>
			<ToastContainer />
		</BrowserRouter>
	);
};

export default App;
