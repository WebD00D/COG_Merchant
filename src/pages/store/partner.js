import React, { Component } from 'react';
import styled from 'styled-components';

import ClientNavbar from '../../components/ClientNavbar';

import { Tabs, List, Button } from 'antd';

const TabPane = Tabs.TabPane;

const MainContent = styled.div`
  padding: 30px;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 40px;
  padding-bottom: 200px;
`;

const StoreHero = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 420px;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
`;

class Partner extends Component {
  render() {
    return (
      <div>
        <ClientNavbar />
        <StoreHero
          style={{
            backgroundImage: `url(${require('../../layouts/images/coffeeshop.jpg')})`
          }}
        />
        <MainContent>
          <div className="page-container">
            <div className="m-b-40">
              <h1>
                <b>Menotti's Coffee Co.</b>
              </h1>
              <h3>(804) 555-5555</h3>
              <h3>123 Main Street, Richmond, VA 23233</h3>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Menu" key="1">
                <List header={<h2>Coffee</h2>} itemLayout="horizontal">
                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>

                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>

                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>
                </List>

                <List header={<h2>Pastries</h2>} itemLayout="horizontal">
                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>

                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>

                  <List.Item actions={[<Button>Add to Cart</Button>]}>
                    <List.Item.Meta
                      title={<h4> Cafè Latte </h4>}
                      description={`A latte is a coffee drink made with espresso and steamed milk. The term as used in English is a shortened form of the Italian caffè latte, caffelatte or caffellatte, which means "milk coffee"`}
                    />
                    <div>$3.95</div>
                  </List.Item>
                </List>
              </TabPane>
              <TabPane tab="About" key="2">
                <div>
                  <b>Specialties </b>
                </div>
                <div className="m-b-30">
                  Located across from the beach and next to Townhouse, this is
                  where we brew some of the best coffee in the area. With vinyl
                  records playing in the background and a perfect view of the
                  boardwalk, our coffee shop is the perfect way to kick start
                  your day. Come to sip on a delicious cappuccino and catch up
                  with a friend, pitch an app, talk about a future movie, or
                  relax and people watch. Our drinks are expertly made by our
                  awesome baristas, so whether you are ordering a coffee,
                  espresso, iced coffee, cortado, flat white, Americano or cold
                  brew, you know it will be made with great care to ensure the
                  best tasting drink near the boardwalk.
                </div>
                <div>
                  <b>History</b>
                </div>
                <div>
                  Established in 2013. Menotti's was the original name of The
                  Townhouse bar back in 1915. An Italian gentleman, named Ceasar
                  Menotti, opened the saloon in 1915 and hid the bar beneath a
                  grocery store upstairs from 1920 to 1933, throughout the
                  prohibition era. We serve Four Barrell coffee from that very
                  building, next door to The Townhouse bar, and come visit the
                  original speakeasy hidden beneath.
                </div>
              </TabPane>
            </Tabs>
          </div>
        </MainContent>
      </div>
    );
  }
}
export default Partner;
