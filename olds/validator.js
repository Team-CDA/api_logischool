const validateBody = (req, res, attribute, type) => {
    if (!req.body[attribute]) {
        return false;
    }

    if (typeof req.body[attribute] !== type) {
        return false;
    }
    return true;
}

const validateParams = (req, res, attribute, type) => {
    if (!req.params[attribute]) {
        return false;
    }

    if (typeof req.params[attribute] !== type) {
        return false;
    }
    return true;
}


module.exports = {
    validateBody,
    validateParams
}

