import React from 'react'

interface IContainer {
  children: React.ReactNode
}

const Container = ({ children }: IContainer) => {
  return (
    <div className='mx-16 my-5 px-5'>
      { children }
    </div>
  )
}

export default Container
