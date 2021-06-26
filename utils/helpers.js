module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    unformat_date: date => {
        const regex = /-/g;
        date.replace(regex, ".");
        console.log(date);
        console.log("UNFORMATTED: " + new Date(date).getTime());
        return `${new Date(date).getTime() / 1000}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
    
        return word;
    }
    }