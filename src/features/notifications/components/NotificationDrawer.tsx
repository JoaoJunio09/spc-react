import { ArrowBigRight, ArrowDownRight, ArrowRight, Bell, X } from "lucide-react";
import type { NotificationDTO } from "../../../data/notification/NotificationDTO";
import { Link } from "react-router-dom";

type NotificationDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	notifications: NotificationDTO[];
	unreadCount: number;
	markAsRead: (id: number) => Promise<void>;
	markAllAsRead: () => Promise<void>;
};

function formatTime(createdAt: string): string {
	const date = new Date(createdAt);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMin = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMin / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffMin < 1) return "agora mesmo";
	if (diffMin < 60) return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
	if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
	if (diffDays === 1) return "ontem";
	return `há ${diffDays} dias`;
}

function notificationStyle(type: NotificationDTO["type"]) {
	switch (type) {
		case "SUCCESS":
			return {
				icon: "✓",
				color: "bg-emerald-100 text-emerald-700",
				border: "bg-emerald-50/50 border-emerald-200/60",
			};
		case "INFO":
			return {
				icon: "ℹ",
				color: "bg-blue-100 text-blue-700",
				border: "bg-blue-50/50 border-blue-200/60",
			};
		case "WARNING":
			return {
				icon: "⚠",
				color: "bg-amber-100 text-amber-700",
				border: "bg-amber-50/50 border-amber-200/60",
			};
		case "ERROR":
			return {
				icon: "!",
				color: "bg-rose-100 text-rose-700",
				border: "bg-rose-50/50 border-rose-200/60",
			};
	}
}

function NotificationDrawer({
	isOpen,
	onClose,
	notifications,
	unreadCount,
	markAsRead,
	markAllAsRead
}: NotificationDrawerProps) {

	return (
		<div
			className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
				}`}
		>
			{/* Overlay */}
			<div
				onClick={onClose}
				className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
					}`}
			/>

			<div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
				<div
					className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-white shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
						}`}
				>
					{/* Header */}
					<div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
						<div className="text-left">
							<h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
								<Bell className="w-5 h-5 text-amber-500" />
								Notificações
								{unreadCount > 0 && (
									<span className="bg-rose-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
										{unreadCount}
									</span>
								)}
							</h3>
							<p className="text-xs font-semibold text-slate-500 mt-1">
								Acompanhe avisos e atualizações do sistema.
							</p>
						</div>
						<button
							onClick={onClose}
							className="p-2 border-none hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
							aria-label="Fechar painel"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Conteúdo */}
					<div className="flex-1 overflow-y-auto p-6 space-y-4">
						{notifications.length > 0 ? (
							<div className="space-y-4 text-left">
								<div className="flex items-center justify-between mb-2">
									<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
										Avisos recentes
									</span>
									{unreadCount > 0 && (
										<button
											onClick={markAllAsRead}
											className="border-none bg-transparent text-xs font-bold text-amber-600 hover:text-orange-700 cursor-pointer"
										>
											Marcar todas como lidas
										</button>
									)}
								</div>

								{notifications.map((notif) => {
									const style = notificationStyle(notif.type);
									return (
										<div
											key={notif.id}
											onClick={() =>
												!notif.isRead && markAsRead(notif.id)
											}
											className={`p-4 rounded-xl border transition-all cursor-pointer ${!notif.isRead
												? style.border
												: "bg-white border-slate-100 hover:bg-slate-50"
												}`}
										>
											<div className="flex gap-3">
												<div
													className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${style.color}`}
												>
													{style.icon}
												</div>
												<div className="space-y-1">
													<div className="flex items-start justify-between gap-2">
														<h4 className="text-sm font-bold text-slate-900">
															{notif.title}
														</h4>
														{!notif.isRead && (
															<span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
														)}
													</div>
													<p className="text-xs text-slate-600 leading-relaxed font-semibold">
														{notif.body}
													</p>
													<span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">
														{formatTime(notif.createdAt)}
													</span>
													{notif.title === 'SPC — Sistema atualizado com sucesso' && (
														<span className="flex items-center gap-1 mt-4 text-[.8rem] text-amber-600">
															<Link to='/releases/1.1.0' className="text-amber-600">
																Clique para saber mais
															</Link>
															<ArrowRight size={15} />
														</span>
													)}
													{notif.isRead && (
														<span className="text-[10px] text-slate-400 font-semibold">
															Lida
														</span>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							/* Estado vazio */
							<div className="h-full flex flex-col items-center justify-center text-center p-6">
								<div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
									<Bell className="w-10 h-10" />
								</div>
								<h4 className="text-lg font-black text-slate-900 tracking-tight">
									Você não possui notificações
								</h4>
								<p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mt-1.5">
									O sistema está em dia! Todos os novos registros e avisos
									aparecerão aqui assim que ocorrerem.
								</p>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className="p-6 border-t border-slate-100 bg-slate-50 text-center">
						<p className="text-xs font-semibold text-slate-400">
							SPC Avisos e Central de Frequência • v1.1
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotificationDrawer;