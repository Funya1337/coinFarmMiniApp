import React from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useUser } from "../../contexts/UserContext";
import {
    Button,
    Headline,
    InlineButtons,
    Title,
    Section,
    Progress,
    Placeholder,
  } from "@telegram-apps/telegram-ui";

const Farm = () => {
  const navigate = useNavigate();
  const { tg } = useTelegram();
  tg.BackButton.show();

  tg.onEvent('backButtonClicked', () => {
    navigate(-1);
    tg.BackButton.hide();
  })

  const { userData, setUserData } = useUser();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 61px)" }}>
        <div>
            <Headline plain weight="3" style={{ textAlign: "center" }}>
            Your balance
            </Headline>
            <Title style={{ textAlign: "center" }} level="1" plain weight="1">
            {userData.gameSession?.storage}🥑
            </Title>
        </div>
        <div>
            Farm page
        </div>
    </div>
  );
};

export default Farm;
