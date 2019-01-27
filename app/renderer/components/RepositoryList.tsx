import React from "react";
import { Observer } from "mobx-react";
import { List, Button } from "antd";
import { store } from "../store";

export const RepositoryList: React.SFC = () => (
  <Observer>
    {() => (
      <List
        style={{ minWidth: "174px" }}
        dataSource={store.repositories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={`remove-${item}`}
                icon="close"
                size="small"
                style={{ border: "none" }}
                onClick={() => store.removeRepositories([item])}
              />
            ]}
          >
            {item}
          </List.Item>
        )}
      />
    )}
  </Observer>
);
