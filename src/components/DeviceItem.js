import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import start from "../accets/star.png";
import { DEVICE_ROUTE } from "../utilts/consts";

const DeviceItem = ({ device }) => {
  const history = useHistory();
  return (
    <Col
      md={3}
      className={"mt-5"}
      onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={130}
          height={150}
          src={"https://joxon.s3.amazonaws.com/" + device.image}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Iphone...</div>
          <div className="d-flex align-items-center ">
            <div>{device.rating}</div>
            <Image src={start} width={20} height={20} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
