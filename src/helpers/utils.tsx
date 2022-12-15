
const truncateName = (name: string) => {
    if (name.length > 10) {
        let names = name.split(" ");
        let firstName = names[0];
        let lastNames = names.map((lName, index) => {
            if (index > 0) {
                return lName.substring(0, 1) + ".";
            }
        }).join("");

        if (firstName.length > 10) {
            return firstName.substring(0, 10) + "...";
        }

        return firstName + " " + lastNames;
    }

    return name;
}

const formatDate = (milliseconds: number) => {
    return new Date(milliseconds).toDateString().replaceAll('/', '.');
}

const formatTime = (milliseconds: number) => {
    return new Date(milliseconds).toLocaleTimeString().substring(0, 5);
}

const formatToPercentageString = (number: number) => {
    const num = number * 100;
    return `${num.toFixed(0)}%`;
}

export {
    truncateName,
    formatDate,
    formatTime,
    formatToPercentageString
};