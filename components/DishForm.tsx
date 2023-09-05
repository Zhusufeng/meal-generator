import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { formatDishFieldsValue, transformPayload } from "../lib/dishHelpers";

type Props = {
  modalAction: ModalAction;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
  session: Session;
};

const DishForm: React.FC<Props> = props => {
  const { modalAction, setIsModalOpen, dish, session } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dish && modalAction.action === "EDIT") {
      const formattedDish = formatDishFieldsValue(dish);
      form.setFieldsValue(formattedDish);
    }
    return () => {
      form.resetFields();
    };
  }, [dish, modalAction, form]);

  const onFinish = async (values: any) => {
    console.log("values:", values);

    setIsLoading(true);
    const userId = session.user.id;
    const payload = transformPayload(values, userId);
    console.log("payload", payload);
    // TODO Handle errors
    const dishId = dish?._id || null;
    await modalAction.api(payload, dishId).catch(error => console.log(error));
    mutate("/api/dish");
    setIsLoading(false);
    setIsModalOpen(false);
    form.resetFields();
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
