module.exports = {
    unformat_date: date => {
        const regex = /-/g;
        date.replace(regex, ".");
        return `${new Date(date).getTime() / 1000}`;
    },
}

//         console.log(date);
// console.log("UNFORMATTED: " + new Date(date).getTime());