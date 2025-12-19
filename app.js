// // import fetch from "node-fetch";

// const API_URL = "https://randomuser.me/api/?results=10";

// async function getTenRandomUsers() {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);

//   const data = await res.json();

//   return data.results.map((user) => ({
//     name: `${user.name.title} ${user.name.first} ${user.name.last}`,
//     dob: user.dob.date.split("T")[0],
//     email: user.email,
//   }));
// }

// (async () => {
//   try {
//     console.log(await getTenRandomUsers());
//   } catch (err) {
//     console.error(err.message);
//   }
// })();

// async function getTenRandomUsers() {
//   const USER_COUNT = 10;
//   const API_URL = "https://randomuser.me/api/";

//   const fetchPromises = Array.from({ length: USER_COUNT }, async () => {
//     const res = await fetch(API_URL);
//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}`);
//     }
//     return res.json();
//   });

//   const rawResults = await Promise.all(fetchPromises);

//   return rawResults.map((data) => {
//     const user = data.results[0];
//     const dobDate = new Date(user.dob.date);

//     return {
//       name: `${user.name.title} ${user.name.first} ${user.name.last}`,
//       dob: dobDate.toISOString().split("T")[0],
//       email: user.email,
//     };
//   });
// }

// // Run the function
// (async () => {
//   try {
//     const result = await getTenRandomUsers();
//     console.log(result);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// })();

// const API_URL = "https://randomuser.me/api/";

// async function getTenRandomUsers() {
//   const USER_COUNT = 10;

//   const fetchPromises = Array.from({ length: USER_COUNT }, async () => {
//     const res = await fetch(API_URL);
//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}`);
//     }
//     return res.json();
//   });

//   const rawResults = await Promise.all(fetchPromises);

//   return rawResults.map((data) => {
//     // SAFETY CHECK
//     if (!data.results || !data.results.length) {
//       throw new Error("Invalid API response");
//     }

//     const user = data.results[0];
//     const dobDate = new Date(user.dob.date);

//     return {
//       name: `${user.name.title} ${user.name.first} ${user.name.last}`,
//       dob: dobDate.toISOString().split("T")[0],
//       email: user.email,
//     };
//   });
// }

// // Run
// (async () => {
//   try {
//     const result = await getTenRandomUsers();
//     console.log(result);
//   } catch (err) {
//     console.error("Error fetching users:", err.message);
//   }
// })();

const http = require("http");

const PORT = 3000;
const API_URL = "https://randomuser.me/api/";

/**
 * Service function to fetch 10 random users in parallel.
 * Efficient: Starts all 10 requests at once.
 */
async function getTenRandomUsers() {
  const userCount = 10;

  // Create 10 concurrent requests
  const fetchPromises = Array.from({ length: userCount }, async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

  // Wait for all to finish (Parallel execution)
  const rawResults = await Promise.all(fetchPromises);

  // Transform data to required format
  return rawResults.map((data) => {
    const user = data.results[0];
    const dobDate = new Date(user.dob.date);

    return {
      Name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      DOB: dobDate.toISOString().split("T")[0],
      email: user.email,
    };
  });
}

/**
 * Creating the server using the native 'http' module
 */
const server = http.createServer(async (req, res) => {
  // Basic router for GET /api/random-users
  if (req.url === "/api/random-users" && req.method === "GET") {
    try {
      const users = await getTenRandomUsers();

      // Set headers for JSON response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          count: users.length,
          data: users,
        })
      );
    } catch (error) {
      console.error("Fetch Error:", error.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Internal Server Error",
        })
      );
    }
  } else {
    // Handle 404 - Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(
    `Native Node server running at http://localhost:${PORT}/api/random-users`
  );
});
