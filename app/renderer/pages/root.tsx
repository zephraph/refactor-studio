import React from "react";
import { Layout, Steps, Button } from "antd";
import { RepositorySelector } from "../components/RepositorySelector";
import { Observer } from "mobx-react";
import { store } from "../store";
import { RepositoryList } from "../components/RepositoryList";
import { searchForFileInRepos } from "../lib/github";

const { Content, Footer, Sider } = Layout;
const { Step } = Steps;

export default () => (
  <Layout>
    <Content style={{ background: "white", padding: "20px" }}>
      <h4>Select repositories</h4>
      <RepositorySelector onSelect={(repo) => store.addRepositories([repo])} />
      <RepositoryList />
    </Content>
    <Footer style={{ background: "white", padding: "20px" }}>
      <Button
        type="primary"
        onClick={() => {
          searchForFileInRepos(
            ["artsy/palette", "artsy/reaction"],
            ".autorc"
          ).then((result) => console.log(result));
        }}
      >
        Next
      </Button>
    </Footer>
  </Layout>
);
