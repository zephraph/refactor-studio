import React from "react";
import { Card, Icon, Button } from "antd";

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const { Meta } = Card;

export const ActionCard: React.SFC<ActionCardProps> = ({
  title: name,
  description,
  icon,
  onClick
}) => (
  <Card size="small" className="ActionCard" onClick={onClick}>
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
