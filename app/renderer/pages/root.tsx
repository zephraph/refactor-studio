import React from "react";
import { Layout, Steps, Button } from "antd";
import { RepositorySelector } from "../components/RepositorySelector";
import { Observer } from "mobx-react";
import { store } from "../store";
import { RepositoryList } from "../components/RepositoryList";
import { searchForFileInRepos } from "../lib/github";
import { Link } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { Step } = Steps;

export default () => (
  <Layout>
    <Content style={{ background: "white", padding: "20px" }}>
      <h4>Select repositories</h4>
      <RepositorySelector onSelect={repo => store.addRepositories([repo])} />
      <RepositoryList />
    </Content>
    <Footer style={{ background: "white", padding: "20px" }}>
      <Link to="/select-actions">
        <Button type="primary">Next</Button>
      </Link>
    </Footer>
  </Layout>
);
