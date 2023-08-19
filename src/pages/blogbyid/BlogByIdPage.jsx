import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogByIdPage = () => {
	// const forTesting = "http://localhost:8000";
	const forDeploying = "https://backend-mern-blogsite.onrender.com";
	//done
	const { id } = useParams();
	const userId = localStorage.getItem("userId");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [blogData, setBlogData] = useState({});
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const getBlogData = await axios.get(
					`${forDeploying}/api/v1/blog/${id}`
				);
				setBlogData(getBlogData.data);
				setComments(getBlogData.data.comments);
			} catch (error) {
				console.error("Error fetching blog details:", error);
			}
		};
		fetchData();
	}, [id]);

	const handleCommentSubmit = async () => {
		const newComment = {
			text: commentText,
			blog: id.trim(),
			user: userId,
		};
		try {
			setIsSubmitting(true); // Set loading state
			const response = await axios.post(
				`${forDeploying}/api/v1/blogs/comments/${id}`,
				newComment
			);

			const createdComment = response.data;
			setComments((prevComments) => [...prevComments, createdComment]);
			setCommentText("");
		} catch (error) {
			console.error("Error submitting comment:", error);
		} finally {
			setIsSubmitting(false); // Clear loading state
		}
	};

	// console.log(comments);
	// console.log(blogData);
	return (
		<div className="container">
			<div className="row d-flex justify-content-center mt-5">
				<div className="col-lg-12 ">
					<div className="card p-4">
						<img
							src={blogData.image}
							style={{
								width: "100%",
								height: "500px",
							}}
							className="img-fluid border-radius-lg"
						/>

						<div className="author m-4 align-items-center">
							<img
								src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
								alt="..."
								className="avatar shadow"
							/>
							<div className="name ps-3">
								<span>
									<h6 className="pt-2">
										{blogData.author?.name ||
											"Unknown Author"}
									</h6>
								</span>
								<div className="stats">
									<small>
										{new Date(
											blogData.createdAt
										).toLocaleDateString()}
									</small>
								</div>
							</div>
						</div>

						<div className="card-header">
							<h1>{blogData.title}</h1>
						</div>
						<div className="card-body">
							<p className="card-text">{blogData.content}</p>
						</div>
					</div>
					{/* ..................Comments.................... */}
					{comments &&
						comments.map((comment) => {
							return (
								<React.Fragment key={comment._id}>
									<div className="row m-4">
										<div className="col-2 mt-3">
											<div className="author align-items-center">
												<img
													src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1oLaDJlC-DvPibHvUAluSld6D4KG_Q00x6oMDubpL3K5lLeqWeKn8eUgbQ3ZiWjg6HM&usqp=CAU"
													alt="..."
													className="avatar shadow mt-2"
												/>
												<div className="name ps-3">
													<span>
														<h6 className="pt-2">
															{comment?.user
																?.name ||
																"Unknown Author"}
														</h6>
													</span>
													<div className="stats">
														<small>
															{new Date(
																comment.createdAt
															).toLocaleDateString()}
														</small>
													</div>
												</div>
											</div>
										</div>

										<div className="col-lg-9 pt-2">
											<div className="card">
												<div className="card-body">
													{comment.text}
												</div>
											</div>
										</div>
									</div>
								</React.Fragment>
							);
						})}

					{/* ..................Comments end.................... */}

					{/* separate comment box */}
					<div className="row m-4">
						<div className="col-1">
							<div className="author align-items-center">
								<img
									src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
									alt="..."
									className="avatar shadow"
								/>
							</div>
						</div>

						<div className="col-lg-10 pt-2">
							<textarea
								className="form-control"
								id="exampleFormControlTextarea1"
								value={commentText}
								rows="3"
								onChange={(e) => {
									setCommentText(e.target.value);
								}}
							></textarea>
							<button
								className=" btn btn-lg bg-gradient-info mt-3"
								onClick={handleCommentSubmit}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Submitting..." : "Comment"}
							</button>
						</div>
					</div>
					{/* ..... */}
				</div>
			</div>
		</div>
	);
};

export default BlogByIdPage;
