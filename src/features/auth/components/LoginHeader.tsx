type LoginHeaderProps = {
	title: string,
	subTitle: string
}

function LoginHeader({ title, subTitle }: LoginHeaderProps) {
	return (
		<header className="mb-1 text-left">
			<h2 className="text-2xl font-extrabold text-[#1E293B] tracking-tight mb-1.5">{title}</h2>
			<p className="text-[0.95rem] text-[#64748B] font-medium leading-normal">{subTitle}</p>
		</header>
	)
}

export default LoginHeader;