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

import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate();
  const { tg, onToggle } = useTelegram();
  tg.BackButton.show();

  tg.onEvent("backButtonClicked", () => {
    navigate(-1);
    tg.BackButton.hide();
    tg.MainButton.hide();
  });

  const handleClick = () => {
    onToggle("Checkout");
  }

  const { userData, setUserData } = useUser();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 61px)",
      }}
    >
      <div>
        <Headline plain weight="3" style={{ textAlign: "center" }}>
          Your balance
        </Headline>
        <Title style={{ textAlign: "center" }} level="1" plain weight="1">
          {userData.gameSession?.storage}🥑
        </Title>
      </div>

      <div>
        <div class="grid-container">
          <div class="grid-item">
            <div className="HIJtihMA8FHczS02iWF5">
              <Placeholder
                action={
                  <Button onClick={handleClick} size="s" stretched>
                    0.000001🥑
                  </Button>
                }
                description="add +1 to click"
                header="Impact"
              >
                <img
                  alt="Telegram sticker"
                  width='80px'
                  className="blt0jZBzpxuR4oDhJc8s"
                  src="https://xelene.me/telegram.gif"
                />
              </Placeholder>
            </div>
          </div>
          <div class="grid-item">
          <div className="HIJtihMA8FHczS02iWF5">
              <Placeholder
                action={
                  <Button size="s" stretched>
                    Action
                  </Button>
                }
                description="Description"
                header="Title"
              >
                <img
                  alt="Telegram sticker"
                  width='80px'
                  className="blt0jZBzpxuR4oDhJc8s"
                  src="https://xelene.me/telegram.gif"
                />
              </Placeholder>
            </div>
          </div>
          <div class="grid-item">
          <div className="HIJtihMA8FHczS02iWF5">
              <Placeholder
                action={
                  <Button size="s" stretched>
                    Action
                  </Button>
                }
                description="Description"
                header="Title"
              >
                <img
                  alt="Telegram sticker"
                  width='80px'
                  className="blt0jZBzpxuR4oDhJc8s"
                  src="https://xelene.me/telegram.gif"
                />
              </Placeholder>
            </div>
          </div>
          <div class="grid-item">
          <div className="HIJtihMA8FHczS02iWF5">
              <Placeholder
                action={
                  <Button size="s" stretched>
                    Action
                  </Button>
                }
                description="Description"
                header="Title"
              >
                <img
                  alt="Telegram sticker"
                  width='80px'
                  className="blt0jZBzpxuR4oDhJc8s"
                  src="https://xelene.me/telegram.gif"
                />
              </Placeholder>
            </div>
          </div>
        </div>
      </div>

      <div>Footer</div>
    </div>
  );
};

export default Shop;
