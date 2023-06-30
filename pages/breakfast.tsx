import { useState, useEffect } from "react";
import { Form, Button, Select } from "antd";
import axios from "axios";

export default function Breakfast() {
  const [breakfastEntrees, setBreakfastEntrees] = useState([]);
  const [breakfastSides, setBreakfastSides] = useState([]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: bEntrees } = await axios.get("/api/breakfast/entrees");
      setBreakfastEntrees(bEntrees);
      const { data: bSides } = await axios.get("/api/breakfast/sides");
      setBreakfastSides(bSides);
    };

    // TODO handle setting error notifications
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="breakfastEntree"
          label="Breakfast Entree"
          rules={[{ required: true }]}
        >
          <Select>
            {breakfastEntrees.map(el => {
              return (
                <Select.Option key={el} value={el}>
                  {el}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="breakfastSide1" label="Breakfast Side #1">
          <Select>
            {breakfastSides.map(el => {
              return (
                <Select.Option key={el} value={el}>
                  {el}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="breakfastSide2" label="Breakfast Side #2">
          <Select>
            {breakfastSides.map(el => {
              return (
                <Select.Option key={el} value={el}>
                  {el}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
