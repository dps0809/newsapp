import "./App.css";

import React,{Component } from "react";
import NavbarWrapper from "./Component/NavbarWrapper";
import NewsItems from "./Component/NewsItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  newsRef=React.createRef();

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarWrapper searchNews={(query)=>this.newsRef.current.searchNews(query)}/>
          <Routes>
            <Route path="/" element={<NewsItems ref={this.newsRef} key="general" pageSize={12} country="us" category="general" />} />
            <Route path="/search" element={<NewsItems ref={this.newsRef} key="general" pageSize={12} country="us" category="searched" />} />
            <Route path="/sports" element={<NewsItems ref={this.newsRef} key="sports" pageSize={12} country="us" category="sports" />} />
            <Route path="/business" element={<NewsItems ref={this.newsRef} key="business" pageSize={12} country="us" category="business" />} />
            <Route path="/health" element={<NewsItems ref={this.newsRef} key="health" pageSize={12} country="us" category="health" />} />
            <Route path="/science" element={<NewsItems ref={this.newsRef} key="science" pageSize={12} country="us" category="science" />} />
            <Route path="/technology" element={<NewsItems ref={this.newsRef} key="technology" pageSize={12} country="us" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
