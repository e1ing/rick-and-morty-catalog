import React from 'react'

export const App = () => {
  return (
    <h1>
      React TypeScript Webpack Starter - {process.env.NODE_ENV}
      {process.env.name}
    </h1>
  )
}
