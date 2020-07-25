'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

const cssObjectToString = (className, css, customCSS) => {
    let cssString = "" + customCSS;
    if ("standard" in css) {
        // css is a StyleCollection
        const collections = Object.values(css);
        Object.keys(css).forEach((key, index) => {
            cssString += `.${className}${key === "standard" ? "" : `:${key}`}{${cssPropertiesToString(collections[index])}}`;
        });
    }
    else {
        // css is a CSSProperties
        cssString += `.${className}{${cssPropertiesToString(css)}}`;
    }
    return cssString;
};
const cssPropertiesToString = (css) => {
    const cssResults = [];
    const cssValues = Object.values(css);
    Object.keys(css).forEach((key, index) => {
        // CSS Key
        cssResults.push(`${cssKeyToProperString(key)}:`);
        // CSS Value
        cssResults.push(`${cssValues[index]};`);
    });
    return cssResults.join("");
};
const cssKeyToProperString = (key) => {
    // Split the key by uppercase characters
    // So a key like backgroundColor becomes ["background", "Color"]
    const keyParts = key.match(/([A-Z]?[^A-Z]*)/g)?.slice(0, -1) || [];
    if (keyParts.length > 1) {
        // Grab the first part of the key
        const firstPart = keyParts[0].toLowerCase();
        if (firstPart === "webkit" ||
            firstPart === "khtml" ||
            firstPart === "moz" ||
            firstPart === "o") {
            // The first part of the key is a browser-specific identifier
            // So we need to add - to the front of them
            keyParts[0] = `-${keyParts[0]}`;
        }
        // return the combined key with - so "backgroundColor" becomes "background-color"
        return keyParts.join("-").toLowerCase();
    }
    else {
        // We either have just one string, like ["display"]
        // Or we have nothing.
        // Either way, return what's here
        return keyParts.join("").toLowerCase();
    }
};

const generateRandomClassname = (tagname) => {
    const randomNumber = Math.round(Math.random() * Math.pow(100, tagname.length)) +
        Math.round(Date.now());
    return `${tagname}-${randomNumber.toString(36)}`;
};

const StyledElement = (HTMLTag, css, customCSS) => {
    return props => {
        console.log(css);
        const className = generateRandomClassname(HTMLTag);
        const styleElement = document.createElement("style");
        styleElement.innerText = cssObjectToString(className, css, customCSS || "");
        document.head.appendChild(styleElement);
        return React.createElement(HTMLTag, { className: className }, props.children);
    };
};

exports.StyledElement = StyledElement;
