const express = require("express");
const { verifyToken, isManager } = require("./middleware/auth");
require("dotenv").config();

const app = express();

const cors = require("cors");

// app.use(
//     cors({
//         origin: true, // Mengizinkan semua origin dengan merefleksikan nilai origin dari request
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     })
// );

// Tambahkan handler untuk preflight OPTIONS request
// app.options("/*", cors());

// Middleware CORS global: mengatur header untuk semua request
app.use((req, res, next) => {
    // Atur header yang diperlukan
    const origin = req.headers.origin || "*";
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true"); // jika diperlukan

    // Jika request method OPTIONS, langsung kirim response 200
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.json());

const port = process.env.PORT;

// Import routes
const criteriaRoutes = require("./routes/criteriaRoutes");
const criteriaValuesRoutes = require("./routes/criteriaValuesRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const supplierCriteriaValuesRoutes = require("./routes/supplierCriteriaValuesRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const weightsRoutes = require("./routes/weightsRoutes");
const login = require("./routes/loginRoutes");
const register = require("./routes/registerRoutes");

app.use("/api/register", verifyToken, isManager, register);
app.use("/api/login", login);
app.use("/api/criteria", verifyToken, criteriaRoutes);
app.use("/api/criteria-values", verifyToken, criteriaValuesRoutes);
app.use("/api/results", verifyToken, resultsRoutes);
app.use(
    "/api/supplier-criteria-values",
    verifyToken,
    supplierCriteriaValuesRoutes
);
app.use("/api/suppliers", verifyToken, suppliersRoutes);
app.use("/api/users", verifyToken, isManager, usersRoutes);
app.use("/api/weights", verifyToken, weightsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
