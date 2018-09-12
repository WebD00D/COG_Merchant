import React, { Component } from 'react';
import styled from 'styled-components';
import fire from '../../fire';

import ClientNavbar from '../../components/ClientNavbar';

import { Input, Checkbox, Button } from 'antd';

const Search = Input.Search;

const FilterMenu = styled.div`
  width: 300px;
  max-width: 300px;
  padding: 30px;
  background-color: #fff;
  position: fixed;
  top: 0px;
  padding-top: 130px;
  bottom: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MenuTitle = styled.div`
  letter-spacing: 1px;
  color: #abbdd1;
  margin-bottom: 8px;
  font-weight: bold;
`;

const MainContent = styled.div`
  margin-left: 300px;
  padding: 30px;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 130px;
`;

const CategoryList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const CategoryCheck = styled(Checkbox)`
  margin-bottom: 8px !important;
`;

const PartnerCard = styled.div`
  position: relative;
  background-color: #fff;
  padding: 22px;
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const PartnerCategory = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: #f5f5f5;
  color: #abbdd1;
  padding-left: 30px;
  padding-right: 30px;
  height: 32px;
  line-height: 32px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PartnerImage = styled.div`
  height: 120px;
  width: 120px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-right: 30px;
`;

const PartnerMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const PartnerTitle = styled.div`
  font-size: 24px;
`;

const PartnerAddress = styled.div`
  font-size: 13px;
  color: #abbdd1;
  letter-spacing: 0.5px;
`;

const OrderNowButton = styled(Button)`
  position: absolute;
  right: 30px;
`;

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: []
    };

    this.getPartners = this.getPartners.bind(this);
  }

  componentDidMount() {
    this.getPartners();
  }

  getPartners() {
    fire
      .database()
      .ref('/merchants')
      .orderByChild('fields/status')
      .equalTo('Active')
      .once('value', snapshot => {
        console.log('snapshot', snapshot.val());
        this.setState({
          partners: snapshot.val()
        });
      });
  }

  render() {
    const Partners =
      this.state.partners &&
      this.state.partners.map(partner => {
        return (
          <PartnerCard>
            <PartnerCategory>Coffee</PartnerCategory>
            <PartnerImage />
            <PartnerMeta>
              <PartnerTitle>Menotti's Coffee Co.</PartnerTitle>
              <PartnerAddress>
                10am - 11pm | 123 Cary Street Richmond, VA 23233
              </PartnerAddress>
            </PartnerMeta>
            <OrderNowButton type="primary">Order Now</OrderNowButton>
          </PartnerCard>
        );
      });

    return (
      <div>
        <ClientNavbar />
        <FilterMenu>
          <MenuTitle>SEARCH BY NAME</MenuTitle>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
          <CategoryList>
            <MenuTitle>CATEGORIES</MenuTitle>
            <CategoryCheck onChange={e => console.log(e.target.checked)}>
              Burgers
            </CategoryCheck>
            <CategoryCheck onChange={e => console.log(e.target.checked)}>
              Burritos
            </CategoryCheck>
            <CategoryCheck onChange={e => console.log(e.target.checked)}>
              Coffee
            </CategoryCheck>
            <CategoryCheck onChange={e => console.log(e.target.checked)}>
              Barbeque
            </CategoryCheck>
            <CategoryCheck onChange={e => console.log(e.target.checked)}>
              Beer & Wine
            </CategoryCheck>
          </CategoryList>
        </FilterMenu>

        <MainContent>
          <div className="page-container">
            <div className="m-b-40">
              <h1>Partners</h1>
            </div>

            <PartnerCard>
              <PartnerCategory>Burgers</PartnerCategory>
              <PartnerImage />
              <PartnerMeta>
                <PartnerTitle>Carytown Burgers & Fries</PartnerTitle>
                <PartnerAddress>
                  10am - 11pm | 123 Cary Street Richmond, VA 23233
                </PartnerAddress>
              </PartnerMeta>
              <OrderNowButton type="primary">Order Now</OrderNowButton>
            </PartnerCard>

            <PartnerCard>
              <PartnerCategory>Burgers</PartnerCategory>
              <PartnerImage />
              <PartnerMeta>
                <PartnerTitle>Carytown Burgers & Fries</PartnerTitle>
                <PartnerAddress>
                  10am - 11pm | 123 Cary Street Richmond, VA 23233
                </PartnerAddress>
              </PartnerMeta>
              <OrderNowButton type="primary">Order Now</OrderNowButton>
            </PartnerCard>
          </div>
        </MainContent>
      </div>
    );
  }
}
export default Partners;
