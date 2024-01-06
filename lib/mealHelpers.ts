import dayjs from "dayjs";
// const pracData = [
//   {
//     _id: "6598fb690c3b629da31a32fe",
//     userId: {
//       _id: "64d8535357bde9dc7ae69a18",
//       firstName: "Lisa",
//     },
//     mealDate: "2024-01-06T06:54:25.895Z",
//     mealType: {
//       _id: "659793e54faff8b5b2de226a",
//       type: "breakfast",
//     },
//     entrees: [
//       {
//         _id: "64d7ae7e611c0082d1339386",
//         name: "Eggs, scrambled",
//       },
//     ],
//     sides: [],
//     createdAt: "2024-01-06T07:04:09.880Z",
//     updatedAt: "2024-01-06T07:04:09.880Z",
//     __v: 0,
//   },
// ];
type DBUserMeal = {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
  };
  mealDate: string;
  mealType: {
    _id: string;
    type: string;
  };
  entrees: {
    _id: string;
    name: string;
  }[];
  sides: {
    _id: string;
    name: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
// TODO Decouple this!
export const transformMeals = (meals: DBUserMeal[]) => {
  /**
   * {
   *   "2024-01-05": [ {}, {}, {} ]
   * }
   */
  type Map1 = {
    [key: string]: DBUserMeal[];
  };
  const map1: Map1 = {};

  // 1 organize by date (format it)
  meals.forEach(meal => {
    // Add mealDate to map1
    const { mealDate } = meal;
    const formattedDate = dayjs(mealDate).format("YYYY-MM-DD");
    if (!map1[formattedDate]) {
      map1[formattedDate] = [meal];
    } else {
      map1[formattedDate].push(meal);
    }
  });

  console.log("map1", map1);

  /**
   * 2 Within each date, merge the same user into one object
   * Use a dictionary
   * {  user1: [ {}, {}, {} ], user2: []}
   * Create a new dictionary
   * { user1: {}, user2: {} }
   *
   * Your result
   * "2024-01-05": [ {user1}, {user2} ]
   */

  const map2 = {};
  Object.entries(map1).forEach(([date, daysMeals]) => {
    const userMap: { [key: string]: DBUserMeal[] } = daysMeals.reduce(
      (acc, dayMeal: DBUserMeal) => {
        const { userId } = dayMeal;
        const { _id } = userId;
        if (!acc[_id]) {
          acc[_id] = [dayMeal];
        } else {
          acc[_id].push(dayMeal);
        }
        return acc;
      },
      {}
    );

    console.log("userMap", userMap);

    const collapsedUserMap = Object.entries(userMap).reduce((acc, entry) => {
      const [userId, usersMeals] = entry;
      const collapsedData = usersMeals.reduce((acc2, curr) => {
        const { _id, mealType, entrees, sides } = curr;
        acc2[mealType.type] = {
          mealId: _id,
          entrees: entrees.map(({ name }) => name),
          sides: sides.map(({ name }) => name),
        };
        return acc2;
      }, {});

      return {
        userId,
        name: usersMeals[0].userId.firstName,
        ...collapsedData,
      };
    }, {});
    console.log("collapsedUserMap", JSON.stringify(collapsedUserMap, null, 2));

    if (!map2[date]) {
      map2[date] = [collapsedUserMap];
    } else {
      map2[date].push(collapsedUserMap);
    }
  });
  console.log("map2", JSON.stringify(map2, null, 2));
  return map2;
};
