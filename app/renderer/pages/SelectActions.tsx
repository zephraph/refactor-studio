import React from "react";
import { Layout } from "antd";
import { ActionCard } from "../components/ActionCard";

const { Content } = Layout;

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "16px"
};

export const SelectActions = () => (
  <Layout>
    <Content style={{ background: "white", padding: "20px" }}>
      <h4>Select Actions</h4>
      <div style={gridStyles}>
        <ActionCard
          icon="edit"
          name="Update a file"
          description="Updates the contents of a file across multiple repositories."
        />
      </div>
    </Content>
  </Layout>
);
