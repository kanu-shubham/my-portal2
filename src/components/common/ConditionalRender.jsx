import PropTypes from "prop-types";

const propTypes = {
    /** Truthy value to specify if the children should be rendered. Default value is true.  */
    when: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
    /** Node to render */
    children: PropTypes.node,
    /**
     * Node to render as fallback
     * Unless prop has higher priority than when prop. Then the render happens as follows:
     * - unless evaluates to true: fallback is rendered
     * - unless evaluates to false: children is rendered
     * - when evaluates to true: children is rendered
     * - when evaluates to false: fallback is rendered
     * - when is undefined, default to display the children
     */
    fallback: PropTypes.node,
};

const defaultProps = {
    when: undefined,
    children: null,
    fallback: null,
};

function ConditionalRender({ when, children, fallback = null }) {
    if (Boolean(when) === true) {
        return children;
    }

    return fallback;
}

ConditionalRender.propTypes = propTypes;
ConditionalRender.defaultProps = defaultProps;

export default ConditionalRender;
