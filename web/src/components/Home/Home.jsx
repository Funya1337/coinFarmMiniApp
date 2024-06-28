import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useUser } from '../../contexts/UserContext';

import {
  Button,
  Headline,
  InlineButtons,
  Title,
  Section,
  Progress,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import "./Home.css";

const Home = () => {
  const { userData, setUserData } = useUser();
  const [storageAmount, setStorageAmount] = useState(0);
  const [localClicks, setLocalClicks] = useState(0);
  const [state, toggle] = useState(true);
  const { tg } = useTelegram();
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 250 },
  });

  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    tg.expand();
    axios
      .post(`https://2b48-89-169-48-165.ngrok-free.app/api/auth/verify`, {
        initData: tg.initData,
        tg,
      })
      .then((res) => {
        setUserData(res.data);
        setStorageAmount(res.data.gameSession?.storage);
      })
      .catch((err) => console.log(err));
  }, []);

  const useDebounce = (callback, delay) => {
    const latestCallback = useRef();
  
    useEffect(() => {
      latestCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      if (localClicks > 0) {
        const fire = () => {
          setLocalClicks(0);
          latestCallback.current();
        };
  
        const id = setTimeout(fire, delay);
        return () => clearTimeout(id);
      }
    }, [localClicks, delay]);
  
    return () => setLocalClicks(localClicks => parseFloat((localClicks + userData.gameSession?.clickImpact).toFixed(6)));
  };

  const updateStorage = async () => {
    await axios
    .post(`https://2b48-89-169-48-165.ngrok-free.app/api/user/${userData.user?.id}/storage/add/${localClicks}/`)
    .then((res) => {
      setUserData((prevData) => ({
        ...prevData,
        gameSession: {
          ...prevData.gameSession,
          storage: res.data.storage
        }
      }));
    })
    .catch((err) => console.log(err))
  }

  const increaseStorage = () => {
    toggle(!state);
    tg.HapticFeedback.impactOccurred("medium");
    const updatedStorageAmount = parseFloat((storageAmount + userData.gameSession?.clickImpact).toFixed(6));
    setStorageAmount(updatedStorageAmount);
  }

  // const handleRedirect = () => {
  //   navigate('shop');
  // }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 61px)" }}>
      <div>
        <Headline plain weight="3" style={{ textAlign: "center" }}>
          Hi, {userData.user?.username}
        </Headline>
        <Title style={{ textAlign: "center" }} level="1" plain weight="1">
          {storageAmount}🥑
        </Title>
      </div>

      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div className="mid-item" onClick={increaseStorage}>
          <animated.div
            style={{
              scale: x.to({
                range: [0, 0.35, 1],
                output: [1, 0.9, 1],
              }),
            }}
          >
            <img
              width="256px"
              src="https://cdn-icons-png.flaticon.com/512/2262/2262350.png"
              onClick={useDebounce(updateStorage, 1000)}
            />
          </animated.div>
        </div>
        <Placeholder
          action={
            <Button size="s" stretched>
              Special Task
            </Button>
          }
        ></Placeholder>
      </div>

      <div>
        <Section header="Current LvL 💩">
          <Progress value={(storageAmount * 100000 * 100).toFixed(2)} />
        </Section>
        <br />
        <div
          style={{
            border: "1px dashed #9747FF",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <InlineButtons mode="bezeled">
            <InlineButtons.Item onClick={() => navigate('shop')} text="Shop">🔥</InlineButtons.Item>
            <InlineButtons.Item onClick={() => navigate('farm')} text="Farm">💰</InlineButtons.Item>
            <InlineButtons.Item text="Invite Friends">🚀</InlineButtons.Item>
          </InlineButtons>
        </div>
      </div>
    </div>
  );
};

export default Home;
