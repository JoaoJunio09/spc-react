import './index.css';

function TopProgressBar() {
	return (
		<div className="fixed top-0 left-0 w-full h-1 z-350 bg-slate-200">
			<div
				className="h-full w-1/4 bg-amber-500"
				style={{
					animation: 'progress-bar 1.2s linear infinite'
				}}
			/>
		</div>
	)
}

export default TopProgressBar;