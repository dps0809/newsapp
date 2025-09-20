import "./App.css";
import "./Component/NewsItems.css";

import React,{Component } from "react";
import NavbarWrapper from "./Component/NavbarWrapper";
import NewsItems from "./Component/NewsItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  newsRef=React.createRef();
  
  constructor() {
    super();
    this.state = {
      isDarkMode: false
    };
  }

  toggleDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  render() {
    let pageSize=6;
    return (
      <BrowserRouter>
        <div className={this.state.isDarkMode ? 'dark-mode' : 'light-mode'}>
          <NavbarWrapper 
            searchNews={(query)=>this.newsRef.current.searchNews(query)}
            isDarkMode={this.state.isDarkMode}
            toggleDarkMode={this.toggleDarkMode}
          />
          <Routes>
            <Route path="/" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="general" />} />
            <Route path="/search" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="searched" />} />
            <Route path="/sports" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="sports" />} />
            <Route path="/business" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="business" />} />
            <Route path="/entertainment" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="entertainment" />} />
            <Route path="/health" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="health" />} />
            <Route path="/science" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="science" />} />
            <Route path="/technology" element={<NewsItems ref={this.newsRef} pageSize={pageSize} country="us" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
