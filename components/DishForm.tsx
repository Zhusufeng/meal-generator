import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { formatDishFieldsValue, transformPayload } from "../lib/dishHelpers";

type Props = {
  modalAction: ModalAction;
  handleDishModal: (value: boolean) => void;
  dishId: string | null;
  userId: string;
};

const DishForm: React.FC<Props> = props => {
  const { modalAction, handleDishModal, dishId, userId } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const getDish = async (id: string) => {
      const result = await axios.get(`/api/dish/${id}`);
      const dishData = result.data.data;
      setDish(dishData);
      const formattedDish = formatDishFieldsValue(dishData);
      form.setFieldsValue(formattedDish);
    };

    if (dishId) {
      // TODO handle error
      getDish(dishId).catch(error => console.log(error));
    }
    return () => {
      setDish(null);
      form.resetFields();
    };
  }, [dishId, form, handleDishModal]);

  const onFinish = async (values: any) => {
    console.log("values:", values);
    setIsLoading(true);
    const payload = transformPayload(values, userId);
    console.log("payload", payload);
    // TODO Handle errors
    const dishId = dish?._id || null;
    await modalAction.api(payload, dishId).catch(error => console.log(error));
    mutate("/api/dish");
    setIsLoading(false);
    handleDishModal(false);
  };

  return (
    <Form
      name="Add or Edit Dish"
      form={form}
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
          <Checkbox name="entree" value="entree" style={{ lineHeight: "32px" }}>
            Entree
          </Checkbox>
          <Checkbox name="side" value="side" style={{ lineHeight: "32px" }}>
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
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DishForm;
