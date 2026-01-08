export const getRestaurants = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      restaurant: ["Pinch of Spice", "Chamaska"],
    },
  });
};

export const getRestaurant = (req, res) => {
  console.log(`Getting restaurant with id ${req.params.id}`);
  console.log(req.params);
  res.status(200).json({
    success: true,
    data: {
      restaurant: "Hello Madam",
    },
  });
};

export const addRestaurant = (req, res) => {
  console.log("Adding this new Restaurant");
  console.log(req.body);
  res.status(201).json({
    success: true,
    data: {
      restaurant: req.body.name,
    },
  });
};

export const updateRestaurant = (req, res) => {
  console.log(`Updating the Restaurant with id ${req.params.id}`);
  res.status(200).json({
    success: true,
    data: {
      restaurant: req.body.name,
    },
  });
};

export const deleteRestaurant = (req, res) => {
  console.log(`Deleting the Restaurant with id ${req.params.id}`);
  res.status(204).json({
    success: true,
  });
};
