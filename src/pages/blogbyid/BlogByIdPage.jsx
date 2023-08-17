import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const BlogByIdPage = () => {
	const { id } = useParams();
	const userId = localStorage.getItem("userId");
	const location = useLocation();
	const { title, name, author, content, image, formattedDate } =
		location.state;
	const [commentText, setCommentText] = useState("");
	const [commentData, setCommentData] = useState([]);

	const handleCommentSubmit = async () => {
		const newComment = {
			text: commentText,
			blog: id.trim(),
			user: userId,
		};
		setCommentText("");

		try {
			const response = await axios.post(
				`https://backend-mern-blogsite.onrender.com/blogs/comments/${id}`,
				newComment
			);

			const createdComment = response.data;
			setCommentData(createdComment);
		} catch (error) {
			console.error("Error submitting comment:", error);
		}
	};

	return (
		<div className="container">
			<div className="row d-flex justify-content-center mt-5">
				<div className="col-lg-12 ">
					<div className="card p-4">
						<img
							src={image}
							style={{ width: "100%", height: "500px" }}
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
										{name ? name : author.name}
									</h6>
								</span>
								<div className="stats">
									<small>{formattedDate}</small>
								</div>
							</div>
						</div>

						<div className="card-header">
							<h1>{title}</h1>
						</div>
						<div className="card-body">
							<p className="card-text">{content}</p>
						</div>
					</div>

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
								rows="3"
								onChange={(e) => {
									setCommentText(e.target.value);
								}}
							></textarea>
							<button
								className=" btn btn-lg bg-gradient-info mt-3"
								onClick={handleCommentSubmit}
							>
								Comment
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogByIdPage;
