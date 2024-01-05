type Props = {
  entrees: string[];
  sides: string[];
};

const MealTableCell = (props: Props) => {
  const { entrees, sides } = props;
  const entreesList = entrees.length ? entrees.join(", ") : null;
  const sidesList = sides.length ? sides.join(", ") : null;
  return (
    <div>
      <div>Entrees: {entreesList}</div>
      <div>Sides: {sidesList}</div>
    </div>
  );
};

export default MealTableCell;
