import React, { Component } from 'react'


export class News extends Component {
    render() {
      let {title, description, imageUrl,newsUrl,time,source} = this.props;
    return (
      <div>
        <div className="container my-4">
            <div className="card" >
              <img src={imageUrl ? imageUrl : "https://t4.ftcdn.net/jpg/05/83/34/23/360_F_583342356_OE57DmNMJ1wCzwavInyGYzT6Mdg5lUz3.jpg"} alt ="..." />
              <div className="card-body">
                <span className="badge text-bg-secondary">{source}</span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">Published on {time.slice(0,10)}</small></p>
                <a href={newsUrl} target= "_blank " className="btn btn-dark">Read more</a>
              </div>
            </div>
        </div>
      </div>
    )
  }
}


export default News