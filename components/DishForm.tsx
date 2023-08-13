import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { USER_ID } from "../lib/constants";

type Props = {
  modalAction: string;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
};

const DishForm: React.FC<Props> = props => {
  const { modalAction, setIsModalOpen, dish } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dish && modalAction === "EDIT") {
      // TODO refine
      const recipeInstructions = dish?.recipe?.instructions.join("\n");
      const entree = dish?.type?.entree ? "entree" : null;
      const side = dish?.type?.side ? "side" : null;
      const breakfast = dish?.type?.breakfast ? "breakfast" : null;
      const lunch = dish?.type?.lunch ? "lunch" : null;
      const dinner = dish?.type?.dinner ? "dinner" : null;
      const snack = dish?.type?.snack ? "snack" : null;

      form.setFieldsValue({
        name: dish?.name,
        description: dish?.description,
        imageLink: dish?.imageLink,
        dishType: [entree, side],
        mealType: [breakfast, lunch, dinner, snack],
        recipeLink: dish?.recipe?.link,
        recipeIngredients: dish?.recipe?.ingredientsText,
        recipeInstructions: recipeInstructions,
      });
    }
  }, [dish, modalAction, form]);

  const transformPayload = values => {
    const dishType = values.dishType.reduce((acc, type) => {
      return { ...acc, [type]: true };
    }, {});
    const mealType = values.mealType.reduce((acc, type) => {
      return { ...acc, [type]: true };
    }, {});
    const recipeInstructions = values?.recipeInstructions.split("\n");
    const payload = {
      userId: USER_ID,
      name: values.name,
      description: values.description,
      type: { ...dishType, ...mealType },
      recipe: {
        link: values.recipeLink,
        ingredientsText: values.recipeIngredients,
        instructions: recipeInstructions,
      },
    };
    return payload;
  };

  const onFinish = async (values: any) => {
    console.log("values:", values);

    setIsLoading(true);
    const payload = transformPayload(values);
    console.log("payload", payload);
    // TODO Handle errors
    switch (modalAction) {
      case "ADD":
        try {
          await axios.post("/api/dish", payload);
          mutate("/api/dish");
          break;
        } catch (error) {
          console.log("error", error);
          break;
        }
      case "EDIT":
        try {
          axios.put(`/api/dish/${dish._id}`, payload);

          break;
        } catch (error) {
          console.log("error", error);
          break;
        }
      default:
    }
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
