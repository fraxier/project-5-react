import React from 'react'
import '../css/Loading.css'

function Loading() {

  return (
    <div className='center'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading;