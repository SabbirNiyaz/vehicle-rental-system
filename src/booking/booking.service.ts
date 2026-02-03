import { pool } from "../config/db";

//! Create Booking
const createBooking = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date,
        rent_end_date } = payload;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = client.query(
            `SELECT vehicle_name, daily_rent_price, availability_status
            FROM vehicles
            WHERE id=$1`, [vehicle_id]
        );
        if ((await result).rows.length === 0) {
            return null;
        }

        const vehicle = (await result).rows[0];
        if (vehicle.availability_status !== "available") {
            return false;
        }

        // Calculate price
        const startDate = new Date(rent_start_date as string);
        const endDate = new Date(rent_end_date as string);

        const days = Math.ceil(
            (endDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        // Calculate totalPrice
        const totalPrice = days * Number(vehicle.daily_rent_price);

        // Insert booking
        const bookingResult = await client.query(`
            INSERT INTO bookings (customer_id, vehicle_id, rent_start_date,
            rent_end_date, total_price, status)
            VALUES ($1, $2, $3, $4, $5, 'active')
            RETURNING *`,
            [customer_id, vehicle_id, rent_start_date,
                rent_end_date, totalPrice]
        );

        // Update vehicle status
        await client.query(
            `UPDATE vehicles
            SET availability_status = 'booked'
            WHERE id=$1`, [vehicle_id]
        );

        await client.query("COMMIT");

        return {
            ...bookingResult.rows[0],
            vehicle: {
                vehicle_name: vehicle.vehicle_name,
                daily_rent_price: vehicle.daily_rent_price,
            }
        };

    } catch (err: any) {
        await client.query("ROLLBACK");
        return err.message;
    } finally {
        client.release();
    }
}

//! Get Bookings
const getBookings = async (user: { id: number; role: "admin" | "customer" }) => {
    //! Admin: all bookings
    if (user.role === "admin") {
        const result = await pool.query(`
      SELECT 
        bookings.id,
        bookings.customer_id,
        bookings.vehicle_id,
        bookings.rent_start_date,
        bookings.rent_end_date,
        bookings.total_price,
        bookings.status,
        users.name AS customer_name,
        users.email AS customer_email,
        vehicles.vehicle_name,
        vehicles.registration_number
      FROM bookings
      JOIN users ON users.id = bookings.customer_id
      JOIN vehicles ON vehicles.id = bookings.vehicle_id
      ORDER BY bookings.created_at DESC
    `);

        return result;
    }

    //! Customer: own bookings
    const result = await pool.query(`
    SELECT 
      bookings.id,
      bookings.vehicle_id,
      bookings.rent_start_date,
      bookings.rent_end_date,
      bookings.total_price,
      bookings.status,
      vehicles.vehicle_name,
      vehicles.registration_number,
      vehicles.type
    FROM bookings
    JOIN vehicles ON vehicles.id = bookings.vehicle_id
    WHERE bookings.customer_id = $1
    ORDER BY bookings.created_at DESC
    `,
        [user.id]
    );

    return result;
};




export const bookingService = {
    createBooking,
    getBookings,

}