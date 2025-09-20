import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./NewsItems.css";

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
      query: null,
      searchQuery: null
    };
  }

  filterValidArticles = (articles) => {
    return articles ? articles.filter(article => 
      article && article.title && article.url
    ) : [];
  };

  fetchFromAPI = async (url) => {
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { articles: [], totalResults: 0 };
    }
  };

  updateStateWithArticles = (parsedData, additionalState = {}) => {
    const validArticles = this.filterValidArticles(parsedData.articles);
    this.setState({
      articles: validArticles,
      totalResults: parsedData.totalResults,
      loading: false,
      ...additionalState
    });
  };

  appendArticlesToState = (parsedData, additionalState = {}) => {
    const validArticles = this.filterValidArticles(parsedData.articles);
    this.setState({
      articles: this.state.articles.concat(validArticles),
      totalResults: parsedData.totalResults,
      loading: false,
      ...additionalState
    });
  };

  buildTopHeadlinesURL = (page = 1) => {
    return `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=${page}&pageSize=${this.props.pageSize}`;
  };

  buildSearchURL = (query, page = 1) => {
    return `https://newsapi.org/v2/everything?q=${query}&apiKey=7d8994a26a1e4c9e8b20ff1c524e4cd4&page=${page}&pageSize=${this.props.pageSize}`;
  };

  searchNews = async (query) => {
    this.setState({ 
      loading: true,
      page: 1,
      searchQuery: query
    });
    
    const url = this.buildSearchURL(query, 1);
    const parsedData = await this.fetchFromAPI(url);
    this.updateStateWithArticles(parsedData, { query: true });
  };

  async componentDidMount() {
    if (this.props.category === "searched") {
      this.setState({
        articles: [],
        loading: false,
        page: 1,
        searchQuery: null,
        query: false
      });
      return;
    }
    
    this.setState({ 
      loading: true,
      page: 1,
      searchQuery: null
    });
    
    const url = this.buildTopHeadlinesURL(1);
    const parsedData = await this.fetchFromAPI(url);
    this.updateStateWithArticles(parsedData, { query: false });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      if (this.props.category === "searched") {
        if (this.state.query && this.state.searchQuery) {
          return;
        }
        this.setState({
          articles: [],
          loading: false,
          query: false,
          searchQuery: null
        });
        return;
      }
      this.setState({ 
        loading: true,
        page: 1,
        searchQuery: null
      });
      
      const url = this.buildTopHeadlinesURL(1);
      const parsedData = await this.fetchFromAPI(url);
      this.updateStateWithArticles(parsedData, { query: false });
    }
  }

  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    
    const url = this.buildTopHeadlinesURL(this.state.page + 1);
    const parsedData = await this.fetchFromAPI(url);
    this.appendArticlesToState(parsedData);
  }
  
  fetchSearchNews = async () => {
    if (!this.state.searchQuery) return;
    
    this.setState({ page: this.state.page + 1 });
    
    const url = this.buildSearchURL(this.state.searchQuery, this.state.page + 1);
    const parsedData = await this.fetchFromAPI(url);
    this.appendArticlesToState(parsedData);
  }

  render() {
    return (
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.state.query ? this.fetchSearchNews : this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.articles.length !== this.state.totalResults ? <h4>Loading...</h4> : null}
        >
      <div className="container my-3">
        <h1 className="text-center text-uppercase">
          {this.state.query && this.state.searchQuery 
            ? `Search Results for: ${this.state.searchQuery}` 
            : this.props.category === "searched" 
              ? "Search News" 
              : `News - Top ${this.props.category} Headlines`}
        </h1>
          <div>
            {this.state.loading && <Spinner pageSize={this.props.pageSize} />}
          </div>
          <div className="row">
            {!this.state.loading && this.state.articles.length > 0 &&
              this.filterValidArticles(this.state.articles)
                .map((element) => (
                  <div className="col-md-3" key={element.url}>
                    <NewsCard
                      title={
                        element.title ? element.title : "Title not available"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : "Description not available"
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      time={element.publishedAt}
                      source={element.source?.name || "Unknown Source"}
                    />
                  </div>
                ))}
          </div>
      </div>
        </InfiniteScroll>
    );
  }
}

export default NewsItems;
