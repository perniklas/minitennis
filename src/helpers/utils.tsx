
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

export {
    truncateName
};