import sql from "../config/db.js";

//Get all the restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurantRatingsData = await sql.query(`
      SELECT * FROM restaurants left join (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id
      `);

    res.status(200).json({
      success: true,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (error) {
    console.error("Error in getRestaurants function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

//Get restaurant with id
export const getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch restaurant with aggregated review data
    const restaurant = await sql.query(
      `SELECT 
         restaurants.*, 
         COALESCE(reviews.count, 0) AS count, 
         COALESCE(reviews.average_rating, 0) AS average_rating
       FROM restaurants
       LEFT JOIN (
           SELECT restaurant_id, COUNT(*) AS count, TRUNC(AVG(rating), 1) AS average_rating
           FROM reviews
           GROUP BY restaurant_id
       ) reviews
       ON restaurants.id = reviews.restaurant_id
       WHERE restaurants.id = $1
       LIMIT 1`,
      [id],
    );

    if (restaurant.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Fetch individual reviews (can be empty)
    const reviews = await sql.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1 ORDER BY id DESC;",
      [id],
    );

    res.status(200).json({
      success: true,
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.error("Error in getRestaurant function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

//Add a restaurant
export const addRestaurant = async (req, res) => {
  const { name, location, price_range } = req.body;
  if (!name || !location || !price_range) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required." });
    return;
  }

  try {
    const newRestaurant = await sql.query(
      "INSERT INTO restaurants(name, location, price_range) VALUES($1,$2,$3) RETURNING *;",
      [name, location, price_range],
    );
    res
      .status(201)
      .json({ success: true, data: { restaurant: newRestaurant.rows[0] } });
  } catch (error) {
    console.error("Error in createRestaurant function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

//Update a restaurant details
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location, price_range } = req.body;
  if (!name || !location || !price_range) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required." });
    return;
  }

  try {
    const updateRestaurant = await sql.query(
      " UPDATE restaurants SET name = $1, price_range = $2, location = $3 WHERE id = $4 RETURNING *;",
      [name, price_range, location, id],
    );
    if (updateRestaurant.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found." });
    }
    res
      .status(200)
      .json({ success: true, data: { restaurant: updateRestaurant.rows[0] } });
  } catch (error) {
    console.error("Error in updateRestaurant function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

//Delete a Restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await sql.query(
      " DELETE FROM restaurants WHERE id=$1;",
      [id],
    );
    if (deletedRestaurant.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found." });
    }
    res.status(204).json({ success: true });
  } catch (error) {
    console.error("Error in deleteRestaurant function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

//Add a review to restaurant with id
export const addReview = async (req, res) => {
  const { name, rating, comment } = req.body;
  const { id } = req.params;

  if (!name || !rating || !comment) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required." });
    return;
  }

  try {
    const newReview = await sql.query(
      "INSERT INTO reviews(restaurant_id, name, rating, comment) VALUES($1,$2,$3,$4) RETURNING *;",
      [id, name, rating, comment],
    );
    res
      .status(201)
      .json({ success: true, data: { reviews: newReview.rows[0] } });
  } catch (error) {
    console.error("Error in createRestaurant function", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
