const compactObject = (object) => {
    const plainObject = object.toJSON();
    const objectKeys = Object.keys(plainObject);

    if (objectKeys.length <= 2) {
        return object[objectKeys[0]];
    } else {
        const newObject = {};
        for (attribute in object) {
            const nestedObject = object[attribute];
            if (typeof nestedObject === 'object') {
                try {
                    if (Array.isArray(nestedObject)) {
                        plainObject[attribute] = compact(nestedObject);
                    } else {
                        plainObject[attribute] = compactObject(nestedObject);
                    }
                } catch (error) {
                }
            }
        }
        return plainObject;
    }
}

const compact = (data) => {
    if (Array.isArray(data)) {
        return data.map(e => compactObject(e));
    } else {
        return compactObject(data);
    }
}

module.exports = { compact }
