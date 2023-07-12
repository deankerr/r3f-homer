import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h1>{'Oh no!'}</h1>
      <p>An error has occured:</p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? error.error?.message || error.statusText
            : 'Unknown error message'}
        </i>
      </p>
    </div>
  )
}
