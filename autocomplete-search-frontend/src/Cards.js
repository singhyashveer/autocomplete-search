import React from 'react'

const Cards = ({cards}) => {
  return (
    <div className="card-container">
          {cards.map((card) => (
            <div key={card.title} className="card">
              <div>
                <span className="heading">Title:</span> {card.title}
              </div>
              <div>
                <span className="heading">Summary:</span> {card.summary}
              </div>
              <div>
                <span className="heading">Author:</span> {card.author}
              </div>
            </div>
          ))}
        </div>
  )
}

export default Cards