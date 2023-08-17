import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlogPage = () => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			title: "",
			content: "",
			image: "",
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
				const response = await axios.post(
					"https://backend-mern-blogsite.onrender.com/create-blog",
					{ ...values }
				);
				const data = response.data;
				console.log(data);
				if (data) {
					toast.success("Blog Created");
					navigate("/user-blogs");
				}
				resetForm({
					values: "",
				});
			} catch (error) {
				toast.error("Failed!");
			}
		},
	});

	return (
		<div className="container">
			<h1 className="text-center m-3">Create Blog</h1>
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
								Create
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateBlogPage;
