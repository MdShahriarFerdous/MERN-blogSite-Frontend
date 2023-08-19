import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateBlog = () => {
	// const forTesting = "http://localhost:8000";
	const forDeploying = "https://blogtime-app-shahriar.onrender.com";
	const { id } = useParams();
	const location = useLocation();
	const { title, content, image } = location.state;
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			title: title,
			content: content,
			image: image,
			author: localStorage.getItem("userId"),
		},

		validationSchema: object({
			title: string()
				.required()
				.trim()
				.min(6, "Minimum be 6 characters long"),
			content: string().trim().required(),
			image: string().required(),
		}),

		onSubmit: async (values, { resetForm }) => {
			try {
				const updateBlog = await axios.put(
					`${forDeploying}/api/v1/update-blog/${id}`,
					{ ...values }
				);
				const updateData = updateBlog.data;
				console.log(updateBlog);
				if (updateData) {
					toast.success("Data Updated");
				}
			} catch (error) {
				toast.error("Failed to update!");
			} finally {
				navigate("/user-blogs");
			}
		},
	});

	return (
		<div className="container">
			<h1 className="text-center m-3">Update Blog</h1>
			<form className="form-group" onSubmit={formik.handleSubmit}>
				<div className="row d-flex justify-content-center">
					<div className="col-lg-8">
						<div className="card p-5">
							<label className="m-2">Title</label>
							<input
								type="text"
								className="form-control p-3"
								placeholder="Title"
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
							/>
							{formik.touched.title && formik.errors.title && (
								<span className="text-danger m-2">
									{formik.errors.title}
								</span>
							)}
							<label className="m-2">Content</label>
							<input
								type="text"
								className="form-control p-3"
								placeholder="Content"
								name="content"
								value={formik.values.content}
								onChange={formik.handleChange}
							/>
							{formik.touched.content &&
								formik.errors.content && (
									<span className="text-danger m-2">
										{formik.errors.content}
									</span>
								)}
							<label className="m-2">Image URL</label>
							<input
								type="text"
								className="form-control p-3"
								placeholder="Image URL"
								name="image"
								value={formik.values.image}
								onChange={formik.handleChange}
							/>
							{formik.touched.image && formik.errors.image && (
								<span className="text-danger m-2">
									{formik.errors.image}
								</span>
							)}
							<button
								type="submit"
								className="btn bg-gradient-primary btn-lg mt-4 submit-button shadow-sm"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateBlog;
