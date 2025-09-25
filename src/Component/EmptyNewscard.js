import React, { Component } from 'react'
import image from './image.png' 

const EmptyNewscard=()=>{
    return (
        <div className='container my-3'>
          <div className="card" aria-hidden="true">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a className="btn btn-dark disabled placeholder col-6" alt="..." aria-disabled="true" href="/"></a>
              </div> 
            </div>
          </div>
    )
  }


export default EmptyNewscard