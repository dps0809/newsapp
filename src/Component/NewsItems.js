import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class NewsItems extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  searchNews = async (query) => {
    console.log("searching");
    console.log(query);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }



  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrev = async () => {
    console.log("Previous");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  handleNext = async () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      console.log("Next");
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center text-uppercase">
          News - Top {this.props.category} Headlines
        </h1>
        <div>
          {this.state.loading && <Spinner pageSize={this.props.pageSize} />}
        </div>
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <NewsCard
                  title={element.title ? element.title : "Title not available"}
                  description={
                    element.description
                      ? element.description.slice(0, 80)
                      : "Description not available"
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  time={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePrev}
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default NewsItems;
