import User from "../models/User.js";
import Order from "../models/Order.js";
import { getStartAndEndOfDay, getStartAndEndOfMonth, getStartAndEndOfWeek } from "../utils/handelDate.js";
import { listUserThisMonth, totalSpentByUserIDThisMonth } from "./order.service.js";

export const {
    revenueOfDay,
    newUserOfDay,
    revenueToday,
    newUserToday,
    revenueOfWeek,
    newUserOfWeek,
    revenueOfMonth,
    newUserOfMonth,
    revenueThisWeek,
    newUserThisWeek,
    revenueThisMonth,
    newUserThisMonth,
    topUserThisMonth,
    detailNewUserOfMonth,
    detailRevenueOfMonth,
    detailRevenueThisWeek,
} = {

    topUserThisMonth: async () => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

            const listUser = await listUserThisMonth(firstDayOfMonth, firstDayOfNextMonth);
            const listTotal = await Promise.all(listUser.map((item) => totalSpentByUserIDThisMonth(item, firstDayOfMonth, firstDayOfNextMonth)));

            listTotal.sort((a, b) => b.total - a.total);
            listTotal.length = 5;

            return {
                success: true,
                status: 200,
                message: "Get Top User This Month Successful!!!",
                data: listTotal,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    detailNewUserOfMonth: async (month, year) => {
        try {
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const firstDayOfNextMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);

            let detailRevenue = [];
            let today = firstDayOfMonth.getDate();
            let lastDay = lastDayOfMonth.getDate();
            while (today <= lastDay) {
                let newUserToday = await newUserOfDay(today, month - 1, year);
                detailRevenue.push({ date: today, totalNewUser: newUserToday.data });

                today += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Revenue Of Month Successful!!!",
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
                message: "Get Detail Revenue Of Month Successful!!!",
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

    detailRevenueThisWeek: async () => {
        try {
            const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const today = new Date();
            const result = getStartAndEndOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const endOfWeek = result.end;
            const fristOfWeek = result.start;

            let i = 0;
            let detailRevenue = [];
            let endDay = endOfWeek.getDate();
            let firstDay = fristOfWeek.getDate();
            while (firstDay < endDay) {
                let revToday = await revenueOfDay(firstDay - 1, today.getMonth(), today.getFullYear());
                detailRevenue.push({ day: dayOfWeek[i], revenue: revToday.data });
                i += 1;
                firstDay += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Revenue This Week Successful!!!",
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

    newUserThisMonth: async () => {
        try {
            const today = new Date();
            const totalUserThisMonth = await newUserOfMonth(today.getMonth() + 1, today.getFullYear());
            const totalUserLastMonth = await newUserOfMonth(today.getMonth() - 1, today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalUserThisMonth.data < totalUserLastMonth.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalUserLastMonth.data === 0) {
                percent = 100;
                if (totalUserThisMonth.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalUserLastMonth.data - totalUserThisMonth.data) / totalUserLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: {
                    totalNewUser: totalUserThisMonth.data,
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

    newUserThisWeek: async () => {
        try {
            const today = new Date();
            const totalUserThisWeek = await newUserOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const totalUserLastWeek = await newUserOfWeek(today.getDate() - 7, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalUserThisWeek.data < totalUserLastWeek.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalUserLastWeek.data === 0) {
                percent = 100;
                if (totalUserThisWeek.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalUserLastWeek.data - totalUserThisWeek.data) / totalUserLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total New User This Week Successful!!!",
                data: {
                    totalNewUser: totalUserThisWeek.data,
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

    newUserToday: async () => {
        try {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const totalUserToday = await newUserOfDay(today.getDate(), today.getMonth(), today.getFullYear());
            const totalUserYesterday = await newUserOfDay(today.getDate() - 1, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalUserToday.data > totalUserYesterday.data) {
                type = "Increase";
            } else {
                type = "Reduce";
            }

            if (totalUserYesterday.data === 0) {
                percent = 100;
                if (totalUserToday.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalUserToday.data - totalUserYesterday.data) / totalUserYesterday.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total New User Today Successful!!!",
                data: {
                    totalNewUser: totalUserToday.data,
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
                if (revLastMonth.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
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

    revenueThisWeek: async () => {
        try {
            const today = new Date();
            const revThisWeek = await revenueOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const revLastWeek = await revenueOfWeek(today.getDate() - 7, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (revThisWeek.data < revLastWeek.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (revLastWeek.data === 0) {
                percent = 100;
                if (revLastWeek.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((revLastWeek.data - revThisWeek.data) / revLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Week Successful!!!",
                data: {
                    revenue: revThisWeek.data,
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
                if (revYesterday.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
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

    newUserOfDay: async (day, month, year) => {
        try {
            const result = getStartAndEndOfDay(day, month, year);
            const today = result.start;
            const tomorrow = result.end;

            const listUser = await User.find({ createdAt: { $gte: today, $lte: tomorrow } });

            return {
                success: true,
                status: 200,
                message: "Get Total New User ToDay Successful!!!",
                data: listUser.length,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    newUserOfWeek: async (day, month, year) => {
        try {
            const result = getStartAndEndOfWeek(day, month, year);
            const startOfWeek = result.start;
            const endOfWeek = result.end;

            const listUser = await User.find({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } });

            return {
                success: true,
                status: 200,
                message: "Get Revenue Week Successful!!!",
                data: listUser.length,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    newUserOfMonth: async (month, year) => {
        try {
            const result = getStartAndEndOfMonth(month, year);
            const firstDayOfMonth = result.start;
            const firstDayOfNextMonth = result.end;

            const listUser = await User.find({ createdAt: { $gte: firstDayOfMonth, $lte: firstDayOfNextMonth } });

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: listUser.length,
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
            const result = getStartAndEndOfDay(day, month, year);
            const today = result.start;
            const tomorrow = result.end;

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

    revenueOfWeek: async (day, month, year) => {
        try {
            const result = getStartAndEndOfWeek(day, month, year);
            const startOfWeek = result.start;
            const endOfWeek = result.end;

            const listTotal = await Order.find({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } })
                .select("total -_id");
            const revToday = listTotal.reduce((arc, order) => arc + order.total, 0);

            return {
                success: true,
                status: 200,
                message: "Get Revenue Week Successful!!!",
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
            const result = getStartAndEndOfMonth(month, year);
            const firstDayOfMonth = result.start;
            const firstDayOfNextMonth = result.end;

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
}