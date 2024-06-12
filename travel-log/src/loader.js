// Filename - loader.js

import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
	return (
		<TailSpin
			height="70"
			width="70"
			color="blue"
			ariaLabel="tail-spin-loading"
			radius="2"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
		/>
	);
}; 
export default LoaderComp;
