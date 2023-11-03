import Order from "../models/Order.js";

export const {
    revenueOfDay,
    revenueToday,
    revenueOfMonth,
    revenueThisMonth,
    detailRevenueOfMonth,
} = {

    detailRevenueOfMonth: async (month, year) => {
        try {
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const firstDayOfNextMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);

            let detailRevenue = [];
            let today = firstDayOfMonth.getDate();
            let lastDay = lastDayOfMonth.getDate();
            while (today <= lastDay) {
                let revToday = await revenueOfDay(today, month - 1, year);
                detailRevenue.push({ date: today, revenue: revToday.data });

                today += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Revenue This Month Successful!!!",
                data: detailRevenue,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    revenueOfDay: async (day, month, year) => {
        try {
            // Code lấy thông tin first và last day của tháng và năm input từ client
            // month - 1 bởi vì Date định nghĩa tháng từ 0 > 11 tương đường T1 > T12
            const today = new Date(year, month, day);
            const tomorrow = new Date(year, month, day + 1);
            today.setHours(0, 0, 0, 0);
            tomorrow.setHours(0, 0, 0, 0);

            const listTotal = await Order.find({ createdAt: { $gte: today, $lte: tomorrow } })
                .select("total -_id");
            const revToday = listTotal.reduce((arc, order) => arc + order.total, 0);

            return {
                success: true,
                status: 200,
                message: "Get Revenue ToDay Successful!!!",
                data: revToday,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    revenueOfMonth: async (month, year) => {
        try {
            // Code lấy thông tin first và last day của tháng và năm input từ client
            // month - 1 bởi vì Date định nghĩa tháng từ 0 > 11 tương đường T1 > T12
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const firstDayOfNextMonth = new Date(year, month, 1);
            firstDayOfMonth.setHours(0, 0, 0, 0);
            firstDayOfNextMonth.setHours(0, 0, 0, 0);

            const listTotal = await Order.find({ createdAt: { $gte: firstDayOfMonth, $lte: firstDayOfNextMonth } })
                .select("total -_id");
            const revToday = listTotal.reduce((arc, order) => arc + order.total, 0);

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: revToday,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    revenueThisMonth: async () => {
        try {
            const today = new Date();
            const revThisMonth = await revenueOfMonth(today.getMonth() + 1, today.getFullYear());
            const revLastMonth = await revenueOfMonth(today.getMonth() - 1, today.getFullYear());

            let type = "";
            let percent = 0;

            if (revThisMonth.data < revLastMonth.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (revLastMonth.data === 0) {
                percent = 100;
            } else {
                percent = (((revLastMonth.data - revThisMonth.data) / revLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: {
                    revenue: revThisMonth.data,
                    percent: Math.abs(percent),
                    type,
                },
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    revenueToday: async () => {
        try {
            const today = new Date();
            const yesterday = new Date(today)
            yesterday.setDate(today.getDate() - 1);

            const revToday = await revenueOfDay(today.getDate(), today.getMonth(), today.getFullYear());
            const revYesterday = await revenueOfDay(today.getDate() - 1, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (revToday.data > revYesterday.data) {
                type = "Increase";
            } else {
                type = "Reduce";
            }

            if (revYesterday.data === 0) {
                percent = 100;
            } else {
                percent = (((revToday.data - revYesterday.data) / revYesterday.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue Today Successful!!!",
                data: {
                    revenue: revToday.data,
                    percent: Math.abs(percent),
                    type,
                },
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },
}