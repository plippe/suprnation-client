exports.randomString = function (length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    return chars.split('').sort(function () {
        return 0.5 - Math.random()
    }).join('').substring(0, length);
};

exports.test1DPattern = function (original, test) {
    var originalAsArray = (!Array.isArray(original)) ? original.toString().split('') : original;
    var testAsArray = (!Array.isArray(test)) ? test.toString().split('') : test;

    if (originalAsArray.length === testAsArray.length) {
        var firstLetterIndex = 0;
        var firstLetterMatches = [];
        var completeMatch = false;
        while (firstLetterIndex < originalAsArray.length) {
            if (originalAsArray[firstLetterIndex] === testAsArray[0]) {
                firstLetterMatches.push(firstLetterIndex);
            }
            firstLetterIndex++;
        }

        if (firstLetterMatches.length > 0) {
            var firstLetterMatchIndex = 0;
            while (firstLetterMatchIndex < firstLetterMatches.length && !completeMatch) {
                var currentStartIndex = firstLetterMatches[firstLetterMatchIndex];
                var mismatch = false;
                // console.log("START INDEX: " + currentStartIndex);
                for (var i = 0; i < originalAsArray.length; i++) {
                    // console.log("ORIG : " + originalAsString.charAt((currentStartIndex + i) % originalAsString.length));
                    // console.log("TEST : " + testAsString.charAt(i));
                    if (originalAsArray[(currentStartIndex + i) % originalAsArray.length] !== testAsArray[i]) {
                        mismatch = true;
                    }
                }
                // console.log("Mismatch : " + mismatch);
                firstLetterMatchIndex++;
                completeMatch = !mismatch;
            }
            return completeMatch;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

exports.test2DPattern = function (original, test) {
    if (original.length === test.length) {
        var firstElementIndex = 0;
        var firstElementMatches = [];
        var completeMatch = false;
        while (firstElementIndex < original.length) {
            const originalElement = original[firstElementIndex];
            const testElement = test[0];
            if (originalElement.x === testElement.x && originalElement.y === testElement.y) {
                firstElementMatches.push(firstElementIndex);
            }
            firstElementIndex++;
        }

        if (firstElementMatches.length > 0) {
            var firstElementMatchIndex = 0;
            while (firstElementMatchIndex < firstElementMatches.length && !completeMatch) {
                var currentStartIndex = firstElementMatches[firstElementMatchIndex];
                var mismatch = false;
                for (var i = 0; i < original.length; i++) {
                    const originalElement = original[(currentStartIndex + i) % original.length];
                    const testElement = test[i];
                    if (originalElement.x !== testElement.x || originalElement.y !== testElement.y) {
                        mismatch = true;
                    }
                }
                firstElementMatchIndex++;
                completeMatch = !mismatch;
            }
            return completeMatch;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

exports.deactivateSessions = function (sessions) {
    Object.keys(sessions).forEach(function (id) {
        sessions[id].active = false;
    });
};

exports.convertStringToASCII = function (text) {
    return text.split('').map(convertCharToASCII);
};

exports.convertStringToRandomCase = function (text) {
    return text.split('').map(convertCharToRandomCase).join('');
};

convertCharToASCII = function (char) {
    return char.charCodeAt(0);
};

convertCharToRandomCase = function (char) {
    if (Math.floor(Math.random() * 2 + 1) === 1) {
        return char.toUpperCase();
    } else {
        return char;
    }
};