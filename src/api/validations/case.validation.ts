
const { body } = require("express-validator/check");


const departmentValidation = (method: string) => {
    switch (method) {
        case "add": {
            return [
                body("license", "license is required").exists(),
                body("color", "color is required").exists(),
                body("type", "type is required").exists(),
                body("owner", "owner is required").exists(),
                body("dateOfTheft", "dateOfTheft is required").exists(),
                body("theftDescription", "theftDescription is required").exists()
            ];
        }
        case "resolve": {
            return [
                body("caseId", "caseId is required").exists(),
            ];
        }
    }
};
export default departmentValidation;