import React from 'react'
import '../css/Loading.css'

export default function LoadingWheel() {

  return (
    <div className='center'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}