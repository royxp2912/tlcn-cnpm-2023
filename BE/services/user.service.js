import User from "../models/User.js";

export const { findByEmail } = {
    findByEmail: async (email) => {
        try {
            const existUser = await User.findOne({ email: email });

            if (!existUser) return false;
            return {
                success: true,
                status: 200,
                message: "Find Successful !!!",
                data: existUser,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },
}