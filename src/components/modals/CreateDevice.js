import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalTitle,
  Form,
  FormControl,
  Dropdown,
  Row,
  Col
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Context } from "../..";
import { fetchTypes, fetchBrands } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

const addDevice = ()=>{
  const formData = new FormData()
  formData.append('name', name)
  formData.append('price', `${price}`)
  formData.append('img', file)
  formData.append('brandId', device.selectedBrand.id)
  formData.append('typeId', device.selectedType.id)
  formData.append('info', JSON.stringify(info))

  CreateDevice(formData).then(data=>onHide())
}

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавить устройство
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Dropdown className="mt-3">
            <DropdownToggle>
              {device.selectedType.name || "Выберите тип"}
            </DropdownToggle>
            <DropdownMenu>
              {device.types.map((type) => (
                <DropdownItem
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="mt-3">
            <DropdownToggle>
              {device.selectedBrand.name || "Выберите тип"}
            </DropdownToggle>
            <DropdownMenu>
              {device.brands.map((brand) => (
                <DropdownItem
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройтво"
            type=""
          />
          <FormControl
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимост устройтво"
            type="number"
          />
          <FormControl className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Добавить новую свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <FormControl 
                value = {i.title}
                onChange = {(e)=> changeInfo("title", e.target.value, i.number)}
                placeholder="Введите название свойства" />
              </Col>
              <Col md={4}>
                <FormControl
                value = {i.description}
                onChange = {(e)=> changeInfo("description", e.target.value, i.number)}
                placeholder="Введите описание свойства " />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default CreateDevice;
