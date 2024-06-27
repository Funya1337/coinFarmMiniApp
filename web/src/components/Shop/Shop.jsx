import React from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {
    Button,
    Headline,
    InlineButtons,
    Title,
    Section,
    Progress,
    Placeholder,
  } from "@telegram-apps/telegram-ui";

const Shop = () => {
  const navigate = useNavigate();
  const { tg } = useTelegram();
  tg.BackButton.show();

  tg.onEvent('backButtonClicked', () => {
    navigate(-1);
    tg.BackButton.hide();
  })

  return (
    <div>
        <Headline plain weight="3" style={{ textAlign: "center" }}>
          Your balance
        </Headline>
        <Title style={{ textAlign: "center" }} level="1" plain weight="1">
          123123🥑
        </Title>
    </div>
  );
};

export default Shop;
