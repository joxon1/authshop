import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 1).then((data) => {
      device.setDevices(data);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(()=>{
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 1).then((data) => {
      device.setDevices(data);
      device.setTotalCount(data.count);
    });
  },[device.page, device.selectedBrand, device.selectedType])


  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
          
        </Col>
      </Row>
    </Container>
  );
});
console.log(Pages);
export default Shop;
