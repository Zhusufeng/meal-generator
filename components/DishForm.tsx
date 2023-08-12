import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { mutate } from "swr";

type Props = {
  modalAction: string;
  setIsModalOpen: (value: boolean) => void;
  dishId: string | null;
};

const DishForm: React.FC<Props> = props => {
  const { modalAction, setIsModalOpen, dishId } = props;
  // TODO Use real userId
  const USER_ID = "64c4997d57bde9dc7ae69a0b";
  const onFinish = async (values: any) => {
    console.log("values:", values);
    // TODO Loading state
    switch (modalAction) {
      case "ADD":
        const postPayload = { ...values, userId: USER_ID };
        await axios.post("/api/dish", postPayload);
        mutate("/api/dish");
        break;
      case "EDIT":
        const putPayload = {
          ...values,
          dishId,
          userId: USER_ID,
        };
        axios.put("/api/dish", putPayload);
        break;
      default:
    }
    setIsModalOpen(false);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a dish name." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Meal Type"
        name="mealType"
        rules={[
          {
            required: true,
            message: "Please select at least one meal type.",
          },
        ]}
      >
        <Checkbox.Group>
          <Checkbox value="breakfast" style={{ lineHeight: "32px" }}>
            Breakfast
          </Checkbox>
          <Checkbox value="lunch" style={{ lineHeight: "32px" }}>
            Lunch
          </Checkbox>
          <Checkbox value="dinner" style={{ lineHeight: "32px" }}>
            Dinner
          </Checkbox>
          <Checkbox value="snack" style={{ lineHeight: "32px" }}>
            Snack
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label="Dish Type"
        name="dishType"
        rules={[
          {
            required: true,
            message: "Please select at least one dish type.",
          },
        ]}
      >
        <Checkbox.Group>
          <Checkbox value="entree" style={{ lineHeight: "32px" }}>
            Entree
          </Checkbox>
          <Checkbox value="side" style={{ lineHeight: "32px" }}>
            Side
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Image Link" name="imageLink">
        <Input />
      </Form.Item>

      <Form.Item label="Recipe Link" name="recipeLink">
        <Input />
      </Form.Item>

      <Form.Item label="Recipe Ingredients" name="recipeIngredients">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Recipe Instructions" name="recipeInstructions">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DishForm;
