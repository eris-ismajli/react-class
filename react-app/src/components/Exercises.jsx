import React, { useEffect, useState } from 'react'

const Exercises = () => {
  const [number, setNumber] = useState(0)

  const increment = () => {
    if (number === 10) return
    setNumber(prev => prev + 1)
  }

  const decrement = () => {
    if (number === 0) return
    setNumber(prev => prev - 1)
  }

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={decrement}>-</button>
      <p>{number}</p>
      <button onClick={increment}>+</button>
    </div>
  )
}

export default Exercises
