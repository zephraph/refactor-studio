import React from "react";
import { Layout, Steps } from "antd";
import { RepositorySelector } from "../components/RepositorySelector";
import { Observer } from "mobx-react";
import { store } from "../store";
import { RepositoryList } from "../components/RepositoryList";

const { Content, Sider } = Layout;
const { Step } = Steps;

export default () => (
  <Layout>
    <Sider
      width={230}
      style={{
        background: "#F0F2F5",
        padding: "20px",
        borderRight: "1px solid #F0F2F5",
        height: "100%"
      }}
    >
      <Steps direction="vertical" size="small" current={0}>
        <Step title="Select Repositories" />
        <Step title="In Progress" />
        <Step title="Waiting" />
      </Steps>
    </Sider>
    <Content style={{ background: "white", padding: "20px" }}>
      <h4>Select repositories</h4>
      <RepositorySelector onSelect={(repo) => store.addRepositories([repo])} />
      <RepositoryList />
    </Content>
  </Layout>
);
