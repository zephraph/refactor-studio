import React from "react";
import { Layout } from "antd";
import { ActionCard } from "../components/ActionCard";
import * as actions from "../actions";

const { Content } = Layout;

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "16px"
};

export const SelectActions = () => (
  <Layout>
    <Content style={{ background: "white", padding: "20px" }}>
      <h4>Select an Action</h4>
      <div style={gridStyles}>
        {Object.values(actions).map(action => (
          <ActionCard
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={() =>
              console.log(
                `Transition to action config view for ${action.title}`
              )
            }
          />
        ))}
      </div>
    </Content>
  </Layout>
);
