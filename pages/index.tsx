import { Form, Button, Select } from "antd";
import { BREAKFAST_ENTREES, BREAKFAST_SIDES } from "./data/food";

export default function Home() {
  const onFinish = (values: any) => {
    console.log(values);
  };

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
            {BREAKFAST_ENTREES.map(el => {
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
            {BREAKFAST_SIDES.map(el => {
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
            {BREAKFAST_SIDES.map(el => {
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
