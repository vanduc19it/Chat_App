import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

  return (
    <div id='error-page' style={{textAlign:'center'}}>
        <h1>Opps!</h1>
        <p>{error.message || error.statusText}</p>
    </div>
  )
}
