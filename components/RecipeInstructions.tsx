type Props = {
  instructions: Dish["recipe"]["instructions"];
};
const RecipeInstructions = (props: Props) => {
  const { instructions } = props;

  if (!instructions || !instructions.length) return "No instructions included";
  return (
    <ul>
      {instructions.map((step, idx) => {
        return <li key={`${idx}${step}`}>{step}</li>;
      })}
    </ul>
  );
};

export default RecipeInstructions;
