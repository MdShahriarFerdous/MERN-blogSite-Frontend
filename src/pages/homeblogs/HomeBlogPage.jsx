import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const HomeBlogPage = () => {
	// const forTesting = "http://localhost:8000";
	const forDeploying = "https://backend-mern-blogsite.onrender.com";
	const truncateString = (str, num) => {
		if (str.length > num) return str.slice(0, num) + " .... ";
		else return str;
	};
	const [blogData, setBlogData] = useState([]);
	const [searchData, setSearchData] = useState([]);

	useEffect(() => {
		const requestData = async () => {
			try {
				const response = await axios.get(
					`${forDeploying}/api/v1/blogs`
				);
				const data = response.data;
				// console.log(data);
				setBlogData(data);
				return data;
			} catch (error) {
				console.error("Error fetching Data:", error);
			}
		};
		requestData();
	}, []);
	// console.log(blogData);
	const handleChange = async (event) => {
		try {
			const keyword = event.target.value;
			const searchResponse = await axios.get(
				`${forDeploying}/api/v1/blogSearch/${keyword}`
			);
			const result = searchResponse.data;
			setSearchData(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mb-5">
			<h1 className="text-center m-4">Blogs Feed!</h1>
			<AiOutlineSearch
				style={{
					position: "relative",
					top: "48px",
					left: "287px",
					marginRight: "12px",
				}}
			/>
			<input
				className="form-control my-2 py-3 mb-5"
				placeholder="Search Blogs"
				style={{
					width: "50%",
					margin: "auto",
					outline: "0.15px solid #b815a7",
				}}
				onChange={handleChange}
			/>

			<div className="row gx-4 gy-5 mt-4">
				{(searchData.length > 0 ? searchData : blogData).map(
					(blog, index) => {
						const {
							title,
							author,
							content,
							_id,
							image,
							createdAt,
						} = blog;
						const formattedDate = new Date(
							createdAt
						).toLocaleDateString();
						return (
							<div key={index + 1} className="col-lg-4 ">
								<div className="card">
									<img
										src={image}
										className=" img-fluid border-radius-lg"
									/>
									<div className="card-body">
										<h5 className="card-title">{title}</h5>
										<p className="card-text text-primary">
											Publihsed By: {author.name}
										</p>
										<p>Date: {formattedDate}</p>
										<p className="card-text">
											{truncateString(content, 100)}
											<Link
												className="text-info"
												to={`/blog/${_id}`}
												state={{
													title,
													author,
													content,
													image,
													formattedDate,
												}}
											>
												{content.length > 100
													? "Read More"
													: ""}
											</Link>
										</p>
									</div>
								</div>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default HomeBlogPage;
