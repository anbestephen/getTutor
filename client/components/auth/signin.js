import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Radium from 'radium';
import  { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import  * as actions from '../../actions';
import InputField from './inputField';

const form =  reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate
});

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log('email and password:',{email, password});
        this.props.signinUser({ email, password });
    }
    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Opps!</strong> {this.props.errorMessage }
                </div>
            );
        }
    }
    getStyles() {
        return {
            signinStyle: {
                background: "inherit"
            },
            jumbotronStyle: {
                borderRadius: 0,
                background: "white"
            }
        }
    }
    render() {
        const styles = this.getStyles();
        const { handleSubmit, fields: { email, password } } = this.props;
        return (
            <ReactCSSTransitionGroup
                component="div"
                transitionName="example"
                transitionAppearTimeout={500}
                transitionAppear={true}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="row " style={styles.signinStyle}>
                    <div className="col-xs-6 col-xs-offset-3 jumbotron" style={styles.jumbotronStyle}>
                        <form onSubmit={handleSubmit( this.handleFormSubmit.bind(this))}>
                            <fieldset className="form-group">
                                <label>Email:</label>
                                <Field name="email" component={InputField} type="email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Password:</label>
                                    <Field name="password" component={InputField} type="password" />
                            </fieldset>
                            { this.renderAlert() }
                            <button action="submit" className="btn btn-primary">Sign in</button>
                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}
function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
      errors.firstName = 'Please enter a first name';
    }
    if (!formProps.lastName) {
      errors.lastName = 'Please enter a last name';
    }
    if (!formProps.email) {
      errors.email = 'Please enter a email';
    }

    if (!formProps.password) {
      errors.password = 'Please enter a password';
    }
    return errors;
}
function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(form(Signin));
