import React from "react";
import { Card, Icon, Button } from "antd";

interface ActionCardProps {
  name: string;
  description: string;
  icon: string;
}

const { Meta } = Card;

export const ActionCard: React.SFC<ActionCardProps> = ({
  name,
  description,
  icon
}) => (
  <Card
    size="small"
    className="ActionCard"
    onClick={() => console.log("Card clicked")}
  >
    <Meta
      style={{
        display: "flex",
        alignItems: "center"
      }}
      avatar={<Icon style={{ fontSize: "32px" }} type={icon} />}
      title={name}
      description={description}
    />
  </Card>
);
