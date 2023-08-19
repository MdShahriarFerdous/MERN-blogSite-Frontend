import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./userblog.css";

const UserBlogPage = () => {
	// const forTesting = "http://localhost:8000";
	const forDeploying = "https://backend-mern-blogsite.onrender.com";

	const id = localStorage.getItem("userId");
	// console.log(id);
	const [blogData, setBlogData] = useState("");
	const [userData, setUserData] = useState("");
	const [deleteId, setDeleteId] = useState("");
	const truncateString = (str, num) => {
		if (str.length > num) return str.slice(0, num) + " .... ";
		else return str;
	};

	useEffect(() => {
		const userData = async () => {
			try {
				const response = await axios.get(
					`${forDeploying}/api/v1/user-details/${id}`
				);
				const data = await response.data;
				console.log(data);
				setUserData(data);
				return data;
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		userData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${forDeploying}/api/v1/user/${id}`
				);
				const data = await response.data.blogs;
				console.log(data);
				setBlogData(data);
				return data;
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [deleteId]);
	// console.log(blogData);

	const handleClick = async (id) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const deleteBlog = await axios.delete(
						`${forDeploying}/api/v1/delete-blog/${id}`
					);
					const deletedData = deleteBlog.data;
					setDeleteId(id);
					if (deletedData) {
						Swal.fire(
							"Deleted!",
							"Your task has been deleted.",
							"success"
						);
					}
				}
			});
		} catch (error) {
			console.log(error);
			toast.error("Blog has not Deleted!");
		}
	};
	return (
		<div className="container mb-5">
			<h1 className="m-5 text-center">{`${userData?.name}'s`} Blog</h1>
			<div className="row gx-4 gy-5 mb-5">
				{blogData &&
					blogData.map((blog, index) => {
						const {
							title,
							author,
							content,
							_id,
							image,
							createdAt,
						} = blog;
						const { name } = userData;
						const formattedDate = new Date(
							createdAt
						).toLocaleDateString();
						return (
							<div key={index + 1} className="col-lg-4 ">
								<div className="card">
									<img src={image} />
									<div className="card-body">
										<h5 className="card-title">{title}</h5>

										<p className="card-text text-primary">
											Published By: {name}
										</p>
										<p>Date: {formattedDate}</p>
										<p className="card-text">
											{truncateString(content, 100)}
											<Link
												className="text-info"
												to={`/blog/${_id}`}
												state={{
													title,
													content,
													image,
													name,
													formattedDate,
													_id,
												}}
											>
												{content.length > 100
													? "Read More"
													: ""}
											</Link>
										</p>

										<span className="d-flex flex-row-reverse">
											<AiOutlineDelete
												onClick={() => {
													handleClick(_id);
												}}
												className="text-danger delete"
											/>

											{id === userData._id && (
												<Link
													to={`/blog/update/${_id}`}
													state={{
														title,
														author,
														content,
														_id,
														image,
														createdAt,
													}}
												>
													<AiOutlineEdit className="text-primary edit" />
												</Link>
											)}
										</span>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default UserBlogPage;
