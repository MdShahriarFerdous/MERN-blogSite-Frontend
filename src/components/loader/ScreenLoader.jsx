import React from "react";
import loader from "../../assets/img/loader.svg";
import "./loader.css";

const ScreenLoader = () => {
	return (
		<div className="ProcessingDiv">
			<div className="center-screen">
				<img className="loader-size" src={loader} />
			</div>
		</div>
	);
};

export default ScreenLoader;
