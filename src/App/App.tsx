import React from 'react'
import { Episodes } from '../Episodes/Episodes'
import { RequestStatusType } from '../dal/app-reducer'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../dal/store'

export const App = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  )
  return (
    <>
      <Episodes />
    </>
  )
}
