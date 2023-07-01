import { useState, useEffect } from "react";
import { Card, Form, Button, Select } from "antd";
import axios from "axios";
import Layout from "./components/Layout";

const Breakfast: React.FC = () => {
  const [breakfastEntrees, setBreakfastEntrees] = useState([]);
  const [breakfastSides, setBreakfastSides] = useState([]);

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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };

  const onFinish = (values: any) => {
    const { breakfastEntree, breakfastSide1, breakfastSide2 } = values;
    const entree = `I would like ${breakfastEntree.toLowerCase()} `;
    const side1 = breakfastSide1
      ? `with ${breakfastSide1.toLowerCase()} `
      : null;
    const side2 = breakfastSide2
      ? `and ${breakfastSide2.toLowerCase()}.`
      : null;
    const string = `${entree}${side1}${side2}`;
    console.log("string", string);
  };

  return (
    <Layout>
      <Card title="Breakfast" bordered={false} style={{ maxWidth: 600 }}>
        <Form {...layout} onFinish={onFinish}>
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Breakfast;
