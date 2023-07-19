import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  console.log('Error page')
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h1 className="font-serif text-3xl">&quot;Oh no!&quot;</h1>
      <p>An error has regretfully occured:</p>
      <p>
        <i>{isRouteErrorResponse(error) ? error.error?.message || error.statusText : 'Unknown error message'}</i>
      </p>
    </div>
  )
}
