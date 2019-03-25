
const { body } = require("express-validator/check");


const officerValidation = (method: string) => {
    switch (method) {
        case "add": {
            return [
                body("name", "officer name is required").exists(),
                body("departmentId", "departmentId is required").exists()
            ];
        }
    }
};
export default officerValidation;