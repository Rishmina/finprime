const db = require("../config/db"); // Import your database configuration

// Mock Data (Replace with dynamic queries if needed)
const dashboardData = {
  stats: {
    totalUsers: 1200,
    activeUsers: 850,
    newUsers: 150,
  },
  sales: {
    labels: ["January", "February", "March", "April", "May"],
    values: [1000, 1200, 950, 1100, 1250],
  },
};

// Controller for Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    // Example dynamic query (uncomment and adjust as needed)
    // const [userStats] = await db.query("SELECT COUNT(*) as totalUsers FROM users");
    // const [salesData] = await db.query("SELECT month, total FROM sales ORDER BY month ASC");

    // Replace static data with dynamic data from the database if needed
    // dashboardData.stats.totalUsers = userStats[0].totalUsers;

    res.status(200).json(dashboardData); // Send data with a 200 OK status
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Unable to fetch dashboard data. Please try again later." });
  }
};

module.exports = { getDashboardData };
