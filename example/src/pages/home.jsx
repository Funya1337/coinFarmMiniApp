import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { Navbar, Page, Block, Card, CardHeader, CardContent, Link, Button, Gauge, List, ListItem } from 'framework7-react';
import { useTelegram } from '../hooks/useTelegram';

const HomePage = () => {
  const [userData, setUserData] = useState({});
  const [localClicks, setLocalClicks] = useState(0);
  const { tg, onToggle } = useTelegram();

  const gaugeValue = 10;

  useEffect(() => {
    tg.ready();
    tg.expand();
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/verify`, {initData: tg.initData, tg})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err))
  }, [])
 
  const clickAlert = () => {
    tg.showAlert(`
        Click impact: ${userData.gameSession?.clickImpact}
    Total balance: ${userData.gameSession?.clicks}
      `);
  }

  const updateClicks = async () => {
    await axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/clicks/update/${localClicks}/${userData.user?.id}`)
      .then((res) => {
        setUserData((prevData) => ({
          ...prevData,
          gameSession: {
            ...prevData.gameSession,
            clicks: res.data.clicks
          }
        }));
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const handleMainButtonClick = () => {
      updateClicks();
      setLocalClicks(0);
      tg.MainButton.hide();
    };

    tg.onEvent('mainButtonClicked', handleMainButtonClick);

    return () => {
      tg.offEvent('mainButtonClicked', handleMainButtonClick);
    };
  }, [tg, updateClicks]);

  const handleClick = () => {
    if (!tg.MainButton.isVisible) {
      tg.MainButton.text = "Collect";
      tg.MainButton.show();
    }

    tg.HapticFeedback.impactOccurred("medium");

    const updatedLocalClicks = parseFloat((localClicks + userData.gameSession?.clickImpact).toFixed(6));
    setLocalClicks(updatedLocalClicks);
  };

  return (
  <Page name='home'>
    {/* <Navbar large title={`Hi, ${userData.user?.username}`}></Navbar> */}
    <Navbar title={`Hi, ${userData.user?.username}`}>
        <Link onClick={clickAlert} slot="right">Stats</Link>
      </Navbar>
    <Block>
      <div style={{ alignItems: 'center', display: 'flex', position: 'relative', justifyContent: 'center', flexDirection: 'column' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11451/11451888.png"
          width="150px"
          unselectable="on"
          onClick={handleClick}
        />
        </div>
      {/* <Button fill round large cardClose color="green" disabled={isButtonDisabled} onClick={handleClick}>Click Me!</Button> */}
      {/* <button onClick={onToggle}>toggle</button> */}
      {/* <Button fill round large cardClose color="green" onClick={clickAlert}>show tg alert</Button> */}
    </Block>

    <div className="demo-expandable-cards">
      <Card>
        <CardContent>
        <div className="grid grid-cols-2 grid-gap">
          <div>
            <h3>Storage</h3>
            <h1>{localClicks}</h1>
            <h5>Total balance: {userData.gameSession?.clicks}</h5>
          </div>
          <div>
            <Gauge
              type="circle"
              value={(localClicks * 100000).toFixed(2)}
              size={150}
              borderColor="#2196f3"
              borderWidth={5}
              valueText={`${(localClicks * 10000000).toFixed(0)}%`}
              valueFontSize={30}
              valueTextColor="#2196f3"
              labelText="progress"
            />
          </div>
        </div>
        </CardContent>
      </Card>
      <Card expandable>
        <CardContent padding={false}>
          <div className="bg-color-red" style={{ height: '300px' }}>
            <CardHeader textColor="white" className="display-block">
              Boost shop
              <br />
              <small style={{ opacity: 0.7 }}>Increase your click speed...</small>
            </CardHeader>
            <Link
              cardClose
              color="white"
              className="card-opened-fade-in"
              style={{ position: 'absolute', right: '15px', top: '15px' }}
              iconF7="xmark_circle_fill"
            />
          </div>
          <div className="card-content-padding">
            <br/>
          <List dividersIos mediaList outlineIos strongIos>
            <ListItem
              link="#"
              title="Yellow Submarine"
              after="$15"
              subtitle="Beatles"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            >
              <img
                slot="media"
                style={{ borderRadius: '8px' }}
                src="https://cdn-icons-png.flaticon.com/512/5432/5432448.png"
                width="80"
              />
            </ListItem>
            <ListItem
              link="#"
              title="Don't Stop Me Now"
              after="$22"
              subtitle="Queen"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            >
              <img
                slot="media"
                style={{ borderRadius: '8px' }}
                src="https://cdn-icons-png.flaticon.com/512/5432/5432493.png"
                width="80"
              />
            </ListItem>
            <ListItem
              link="#"
              title="Billie Jean"
              after="$16"
              subtitle="Michael Jackson"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            >
              <img
                slot="media"
                style={{ borderRadius: '8px' }}
                src="https://cdn-icons-png.flaticon.com/512/5432/5432851.png"
                width="80"
              />
            </ListItem>
          </List>
            <p>
              <br/>
              <Button fill round large cardClose color="red">
                Close
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card expandable>
        <CardContent padding={false}>
          <div className="bg-color-yellow" style={{ height: '300px' }}>
            <CardHeader textColor="black" className="display-block">
              Farm zone
              <br />
              <small style={{ opacity: 0.7 }}>Buy machines for autofarm</small>
            </CardHeader>
            <Link
              cardClose
              color="black"
              className="card-opened-fade-in"
              style={{ position: 'absolute', right: '15px', top: '15px' }}
              iconF7="xmark_circle_fill"
            />
          </div>
          <div className="card-content-padding">
            <p>
              Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile
              apps or web apps with iOS or Android (Material) native look and feel. It is also an
              indispensable prototyping apps tool to show working app prototype as soon as possible
              in case you need to. Framework7 is created by Vladimir Kharlampidi.
            </p>
            <p>
              The main approach of the Framework7 is to give you an opportunity to create iOS and
              Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is
              full of freedom. It doesn't limit your imagination or offer ways of any solutions
              somehow. Framework7 gives you freedom!
            </p>
            <p>
              Framework7 is not compatible with all platforms. It is focused only on iOS and Android
              (Material) to bring the best experience and simplicity.
            </p>
            <p>
              Framework7 is definitely for you if you decide to build iOS and Android hybrid app
              (Cordova or Capacitor) or web app that looks like and feels as great native iOS or
              Android (Material) apps.
            </p>
            <p>
              <Button fill round large cardClose color="yellow" textColor="black">
                Close
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
  </Page>
  );
}
export default HomePage;