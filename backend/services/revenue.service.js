import User from "../models/User.js";
import Order from "../models/Order.js";
import { getStartAndEndOfDay, getStartAndEndOfMonth, getStartAndEndOfWeek } from "../utils/handelDate.js";
import { listProductSoldThisMonth, listUserThisMonth, soldProductByProIDThisMonth, totalSpentByUserIDThisMonth } from "./order.service.js";

export const {
    revenueOfDay,
    revenueToday,
    revenueOfWeek,
    revenueThisWeek,
    revenueOfMonth,
    revenueThisMonth,

    newUserOfDay,
    newUserToday,
    newUserOfWeek,
    newUserThisWeek,
    newUserOfMonth,
    newUserThisMonth,
    topUserThisMonth,

    totalOrderOfDay,
    totalOrderOfWeek,
    totalOrderOfMonth,
    totalOrderToday,
    totalOrderThisWeek,
    totalOrderThisMonth,

    topProductThisMonth,
    totalProductSoldOfDay,
    totalProductSoldOfWeek,
    totalProductSoldOfMonth,
    totalProductSoldToday,
    totalProductSoldThisWeek,
    totalProductSoldThisMonth,

    detailNewUserOfMonth,
    detailRevenueOfMonth,
    detailRevenueThisWeek,
    detailTotalOrderOfMonth,
    detailTotalOrderThisWeek,
    detailTotalProductSoldOfMonth,
} = {

    topProductThisMonth: async () => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

            const listProduct = await listProductSoldThisMonth(firstDayOfMonth, firstDayOfNextMonth);
            const listSold = await Promise.all(listProduct.map((item) => soldProductByProIDThisMonth(item, firstDayOfMonth, firstDayOfNextMonth)));

            listSold.sort((a, b) => b.total - a.total);
            if (listSold.length < 5) {
                for (let i = listSold.length; i < 5; i++) {
                    listSold.push({
                        id: "",
                        name: "",
                        image: "",
                        count: "",
                    });
                }
            } else {
                listSold.length = 5;
            }

            return {
                success: true,
                status: 200,
                message: "Get Top Product Sold This Month Successful!!!",
                data: listSold,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    topUserThisMonth: async () => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

            const listUser = await listUserThisMonth(firstDayOfMonth, firstDayOfNextMonth);
            const listTotal = await Promise.all(listUser.map((item) => totalSpentByUserIDThisMonth(item, firstDayOfMonth, firstDayOfNextMonth)));

            listTotal.sort((a, b) => b.total - a.total);
            if (listTotal.length < 5) {
                for (let i = listTotal.length; i < 5; i++) {
                    listTotal.push({
                        id: "",
                        name: "",
                        image: "",
                        count: "",
                    });
                }
            } else {
                listTotal.length = 5;
            }

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

    detailTotalProductSoldOfMonth: async (month, year) => {
        try {
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const firstDayOfNextMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);

            let detailTotalSold = [];
            let today = firstDayOfMonth.getDate();
            let lastDay = lastDayOfMonth.getDate();
            while (today <= lastDay) {
                let totalToday = await totalProductSoldOfDay(today, month - 1, year);
                detailTotalSold.push({ date: today, total: totalToday.data });

                today += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Total Product Sold Of Month Successful!!!",
                data: detailTotalSold,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    detailTotalOrderOfMonth: async (month, year) => {
        try {
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const firstDayOfNextMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);

            let detailTotalOrder = [];
            let today = firstDayOfMonth.getDate();
            let lastDay = lastDayOfMonth.getDate();
            while (today <= lastDay) {
                let totalToday = await totalOrderOfDay(today, month - 1, year);
                detailTotalOrder.push({ date: today, total: totalToday.data });

                today += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Total Order Of Month Successful!!!",
                data: detailTotalOrder,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    detailTotalOrderThisWeek: async () => {
        try {
            const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const today = new Date();
            const result = getStartAndEndOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const fristOfWeek = result.start;

            let i = 0;
            let detailTotalOrder = [];
            while (i < 7) {
                fristOfWeek.setDate(fristOfWeek.getDate() + i)
                let totalToday = await totalOrderOfDay(fristOfWeek.getDate(), fristOfWeek.getMonth(), fristOfWeek.getFullYear());
                detailTotalOrder.push({ day: dayOfWeek[i], total: totalToday.data });
                i += 1;
            }

            return {
                success: true,
                status: 200,
                message: "Get Detail Total Order This Week Successful!!!",
                data: detailTotalOrder,
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
                detailRevenue.push({ date: today, total: newUserToday.data });

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
                detailRevenue.push({ date: today, total: revToday.data });

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
            const fristOfWeek = result.start;

            let i = 0;
            let detailRevenue = [];
            while (i < 7) {
                fristOfWeek.setDate(fristOfWeek.getDate() + i);
                let revToday = await revenueOfDay(fristOfWeek.getDate(), fristOfWeek.getMonth(), fristOfWeek.getFullYear());
                detailRevenue.push({ day: dayOfWeek[i], total: revToday.data });
                i += 1;
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

    totalProductSoldThisMonth: async () => {
        try {
            const today = new Date();
            const totalThisMonth = await totalProductSoldOfMonth(today.getMonth() + 1, today.getFullYear());
            const totalLastMonth = await totalProductSoldOfMonth(today.getMonth() - 1, today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalThisMonth.data < totalLastMonth.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalLastMonth.data === 0) {
                percent = 100;
                if (totalThisMonth.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalThisMonth.data - totalLastMonth.data) / totalLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold This Month Successful!!!",
                data: {
                    total: totalThisMonth.data,
                    percent: Number(percent),
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

    totalProductSoldThisWeek: async () => {
        try {
            const today = new Date();
            const totalThisWeek = await totalProductSoldOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const totalLastWeek = await totalProductSoldOfWeek(today.getDate() - 7, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalThisWeek.data < totalLastWeek.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalLastWeek.data === 0) {
                percent = 100;
                if (totalThisWeek.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalThisWeek.data - totalLastWeek.data) / totalLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold This Week Successful!!!",
                data: {
                    total: totalThisWeek.data,
                    percent: Number(percent),
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

    totalProductSoldToday: async () => {
        try {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const totalToday = await totalProductSoldOfDay(today.getDate(), today.getMonth(), today.getFullYear());
            const totalYesterday = await totalProductSoldOfDay(today.getDate() - 1, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalToday.data > totalYesterday.data) {
                type = "Increase";
            } else {
                type = "Reduce";
            }

            if (totalYesterday.data === 0) {
                percent = 100;
                if (totalToday.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalToday.data - totalYesterday.data) / totalYesterday.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold Today Successful!!!",
                data: {
                    total: totalToday.data,
                    percent: Number(percent),
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

    totalOrderThisMonth: async () => {
        try {
            const today = new Date();
            const totalThisMonth = await totalOrderOfMonth(today.getMonth() + 1, today.getFullYear());
            const totalLastMonth = await totalOrderOfMonth(today.getMonth() - 1, today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalThisMonth.data < totalLastMonth.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalLastMonth.data === 0) {
                percent = 100;
                if (totalThisMonth.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalThisMonth.data - totalLastMonth.data) / totalLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Order This Month Successful!!!",
                data: {
                    total: totalThisMonth.data,
                    percent: Number(percent),
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

    totalOrderThisWeek: async () => {
        try {
            const today = new Date();
            const totalThisWeek = await totalOrderOfWeek(today.getDate(), today.getMonth(), today.getFullYear());
            const totalLastWeek = await totalOrderOfWeek(today.getDate() - 7, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalThisWeek.data < totalLastWeek.data) {
                type = "Reduce";
            } else {
                type = "Increase";
            }

            if (totalLastWeek.data === 0) {
                percent = 100;
                if (totalThisWeek.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalThisWeek.data - totalLastWeek.data) / totalLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Ordere This Week Successful!!!",
                data: {
                    total: totalThisWeek.data,
                    percent: Number(percent),
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

    totalOrderToday: async () => {
        try {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const totalToday = await totalOrderOfDay(today.getDate(), today.getMonth(), today.getFullYear());
            const totalYesterday = await totalOrderOfDay(today.getDate() - 1, today.getMonth(), today.getFullYear());

            let type = "";
            let percent = 0;

            if (totalToday.data > totalYesterday.data) {
                type = "Increase";
            } else {
                type = "Reduce";
            }

            if (totalYesterday.data === 0) {
                percent = 100;
                if (totalToday.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((totalToday.data - totalYesterday.data) / totalYesterday.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total Order Today Successful!!!",
                data: {
                    total: totalToday.data,
                    percent: Number(percent),
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
                percent = (((totalUserThisMonth.data - totalUserLastMonth.data) / totalUserLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: {
                    total: totalUserThisMonth.data,
                    percent: Number(percent),
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
                percent = (((totalUserThisWeek.data - totalUserLastWeek.data) / totalUserLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Total New User This Week Successful!!!",
                data: {
                    total: totalUserThisWeek.data,
                    percent: Number(percent),
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
                    total: totalUserToday.data,
                    percent: Number(percent),
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
                if (revThisMonth.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((revThisMonth.data - revLastMonth.data) / revLastMonth.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Month Successful!!!",
                data: {
                    total: revThisMonth.data,
                    percent: Number(percent),
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
                if (revThisWeek.data === 0) {
                    percent = 0;
                    type = "No Change";
                }
            } else {
                percent = (((revThisWeek.data - revLastWeek.data) / revLastWeek.data) * 100).toFixed(2);
            }

            return {
                success: true,
                status: 200,
                message: "Get Revenue This Week Successful!!!",
                data: {
                    total: revThisWeek.data,
                    percent: Number(percent),
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
                    total: revToday.data,
                    percent: Number(percent),
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

    totalProductSoldOfDay: async (day, month, year) => {
        try {
            const result = getStartAndEndOfDay(day, month, year);
            const today = result.start;
            const tomorrow = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: today, $lte: tomorrow } })
                .select("items.quantity");

            const listQty = listOrder.flatMap(cur => cur.items.map(item => item.quantity));
            const total = listQty.reduce((arc, cur) => arc + cur, 0);

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold Of Day Successful!!!",
                data: total,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    totalProductSoldOfWeek: async (day, month, year) => {
        try {
            const result = getStartAndEndOfWeek(day, month, year);
            const startOfWeek = result.start;
            const endOfWeek = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } })
                .select("items.quantity");

            const listQty = listOrder.flatMap(cur => cur.items.map(item => item.quantity));
            const total = listQty.reduce((arc, cur) => arc + cur, 0);

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold Of Week Successful!!!",
                data: total,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    totalProductSoldOfMonth: async (month, year) => {
        try {
            const result = getStartAndEndOfMonth(month, year);
            const firstDayOfMonth = result.start;
            const firstDayOfNextMonth = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: firstDayOfMonth, $lte: firstDayOfNextMonth } })
                .select("items.quantity");

            const listQty = listOrder.flatMap(cur => cur.items.map(item => item.quantity));
            const total = listQty.reduce((arc, cur) => arc + cur, 0);

            return {
                success: true,
                status: 200,
                message: "Get Total Product Sold Of Month Successful!!!",
                data: total,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    totalOrderOfDay: async (day, month, year) => {
        try {
            const result = getStartAndEndOfDay(day, month, year);
            const today = result.start;
            const tomorrow = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: today, $lte: tomorrow } });

            return {
                success: true,
                status: 200,
                message: "Get Total Order ToDay Successful!!!",
                data: listOrder.length,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    totalOrderOfWeek: async (day, month, year) => {
        try {
            const result = getStartAndEndOfWeek(day, month, year);
            const startOfWeek = result.start;
            const endOfWeek = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } });

            return {
                success: true,
                status: 200,
                message: "Get Total Order Of Week Successful!!!",
                data: listOrder.length,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Revenue Service !!!",
            }
        }
    },

    totalOrderOfMonth: async (month, year) => {
        try {
            const result = getStartAndEndOfMonth(month, year);
            const firstDayOfMonth = result.start;
            const firstDayOfNextMonth = result.end;

            const listOrder = await Order.find({ createdAt: { $gte: firstDayOfMonth, $lte: firstDayOfNextMonth } });

            return {
                success: true,
                status: 200,
                message: "Get Total Order Of Month Successful!!!",
                data: listOrder.length,
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
            console.log("startOfWeek: ", startOfWeek);
            console.log("endOfWeek: ", endOfWeek);

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