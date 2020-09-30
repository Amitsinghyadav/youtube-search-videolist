import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { Table, Card, PageHeader, Button } from "antd";
import { Helmet } from "react-helmet";
import axios from "axios";
const { Meta } = Card;
// import styles from "./App.css"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videolist: [],
      loading: false,
      pagination: {},
    };
  }

  componentDidMount() {
    this.fetch();
    this.fetchSearch();
  }

  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios
      .get(`http://127.0.0.1:8000/search-api/video-list`, {
        params: { ...params },
        type: "json",
      })
      .then((res) => {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.count;
        this.setState({
          videolist: res.data.results,
          pagination,
        });
      });
  };
  fetchSearch = (params = {}) => {
    this.setState({ loading: true });
    axios
      .get(`http://127.0.0.1:8000/search-api/get-video/`, {
        params: { ...params },
        type: "json",
      })
      .then((res) => {});
  };
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      // eslint-disable-next-line react/no-unused-state
      searchedColumn: dataIndex,
    });
  };
  handleTableChange = (pagination, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      search: this.state.searchText,
      page: pagination.current,
      name: this.state.name,
      ordering:
        sorter.order === "ascend" ? "-" + sorter.field : "" + sorter.field,
    });
  };

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Thumbnail URL",
        dataIndex: "thumbnails_urls",
        key: "thumbnails_urls",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Published Date Time",
        dataIndex: "published_date_time",
        key: "published_date_time",
      },
    ];
    // const { classes } = this.props

    return (
      <div>
        <h1>Videos List</h1>
        <Helmet title="Videos List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title row">
              <span className="col-md-10 col-xs-10">
                <strong>Videos List</strong>
              </span>
            </div>
          </div>
          <div className="card-body">
            <Table
              loading={this.state.loading}
              className="utils__scrollTable"
              // scroll={{ x: "max-content" }}
              bordered
              columns={columns}
              dataSource={this.state.videolist}
              onChange={this.handleTableChange}
              pagination={this.state.pagination}
            />
          </div>
          <h1>Pagination</h1>
        </div>
      </div>
    );
  }
}

export default App;
