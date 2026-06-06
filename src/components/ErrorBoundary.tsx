// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Em produção — envia para um serviço de monitoramento
    // Sentry.captureException(error, { extra: info });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <p className="text-lg font-bold text-slate-700">
            Algo deu errado
          </p>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            Tente recarregar a página
          </p>
          <button
            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-bold"
            onClick={() => window.location.reload()}
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;