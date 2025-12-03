const pool = require('./database/');

async function updateRoles() {
    try {
        // Update Happy Employee to 'Employee'
        const res1 = await pool.query("UPDATE account SET account_type = 'Employee' WHERE account_email = 'happy@340.edu'");
        console.log(`Updated Happy Employee to Employee: ${res1.rowCount} row(s) affected`);

        // Update Manager User to 'Admin'
        const res2 = await pool.query("UPDATE account SET account_type = 'Admin' WHERE account_email = 'manager@340.edu'");
        console.log(`Updated Manager User to Admin: ${res2.rowCount} row(s) affected`);

        process.exit(0);
    } catch (error) {
        console.error("Error updating roles:", error);
        process.exit(1);
    }
}

updateRoles();
