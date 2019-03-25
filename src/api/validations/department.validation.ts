
const { body } = require("express-validator/check");


const departmentValidation = (method: string) => {
    switch (method) {
        case "add": {
            return [
                body("name", "department name is required").exists()
            ];
        }
    }
};
export default departmentValidation;