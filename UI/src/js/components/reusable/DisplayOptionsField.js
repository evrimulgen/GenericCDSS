import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * Select component for input/output data
 * */
class DisplayOptionsField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: this.props.selection
        }
    }

    componentWillReceiveProps(props) {
        let selection = props.selection;
        this.setState({selection});
    }

    handleChange = (selection) => {
        if (selection === null) {
            selection = undefined;

            if (this.props.multi)
                this.props.onChange([]);
            else
                this.props.onChange({value: undefined, label: undefined});
        }
        else
            this.props.onChange(selection);
        this.setState({selection});
    };

    render() {
        let validation = this.props.isWarning ? "is-warning": this.props.isInvalid ? "is-invalid": "";
        return (
            <div className={"displayField input-group " + this.props.className}>
                <div className="input-group-prepend d-flex">
                    <span className="input-group-text input-group-addon input-group-infos">
                                        <strong>{this.props.label}</strong>
                                    </span>
                </div>

                {
                    this.props.readOnly ?
                        <input className="displayField form-control enabled" readOnly value={this.props.value}/>
                        :
                        <div className={"flex-fill " + validation}>
                            <Select
                                placeholder={this.props.placeholder}
                                className={"displayField flex-fill " + this.props.selectClassName}
                                name="form-field-name"
                                multi={this.props.multi}
                                value={this.state.selection}
                                onChange={this.handleChange}
                                options={this.props.options}/>
                        </div>

                }
                {
                    this.props.isInvalid ?
                        <div className="invalid-feedback-select">
                            {this.props.invalidMessage}
                        </div> : ''
                }
                {
                    this.props.isWarning ?
                        <div className="warning-feedback-select">
                            {this.props.invalidMessage}
                        </div> : ''
                }

            </div>
        );
    }

    static propTypes = {
        /**
         * Label of the grey box
         * */
        label: PropTypes.string.isRequired,
        /**
         * Selection objects
         * */
        selection: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array
        ]),
        /**
         * Options for the selection
         * */
        options: PropTypes.array.isRequired,
        /**
         * Function comming for the parent component to handle with the selecting change
         *
         * @param Selected value (object {value, label}) or values (array of objects)
         * */
        onChange: PropTypes.func,
        /**
         * Key of the data that will receive the seletec data from the component
         * */
        placeholder: PropTypes.string,
        /**
         * Boolean to block the display to only show data (as a normal input)
         * */
        readOnly: PropTypes.bool,
        /**
         * Boolean to allow multiple selections
         * */
        multi: PropTypes.bool,
        /**
         * Class for the component in general
         * */
        className: PropTypes.string,
        /**
         * Class for the select component only
         * */
        selectClassName: PropTypes.string,
        /**
         * Message to show if the message is valid
         * */
        invalidMessage: PropTypes.string,
        /**
         * Boolean to trigger the invalid message
         * */
        isInvalid: PropTypes.bool,
        /**
         * Boolean to trigger the warning message
         * */
        isWarning: PropTypes.bool
    };
}

DisplayOptionsField.defaultProps = {
    multi: false,
    readOnly: false,
    placeholder: "",
    selectClassName: "Select",
    className: "",
    selection: undefined,
    invalidMessage: "",
    isInvalid: false,
    isWarning: false
};

export default DisplayOptionsField;







