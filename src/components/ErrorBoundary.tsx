import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError()

  let title = 'Что-то пошло не так'
  let message = 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.'

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Страница не найдена'
      message = 'Запрошенная страница не существует.'
    } else if (error.status === 401) {
      title = 'Нет доступа'
      message = 'У вас нет прав для просмотра этой страницы.'
    } else if (error.status === 500) {
      title = 'Ошибка сервера'
      message = 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.'
    }
  }

  if (import.meta.env.DEV && error instanceof Error) {
    message = error.message
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            На главную
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    </div>
  )
}
