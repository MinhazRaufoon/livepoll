import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Link } from 'react-router-dom'

export default function HomePage () {
  const [recentPolls] = useHomeData()

  console.log('Rendering HomePage')

  return (
    <div>
      Recent Polls: <br/>
      {
        Object.values(recentPolls).map(poll => 
          <h2 key={poll.id}>
            <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
          </h2>
        )
      }
    </div>
  )
}
