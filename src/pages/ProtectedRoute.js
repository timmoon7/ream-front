import React, {Component} from 'react'
import {
    Redirect
} from 'react-router-dom'

export default class ProtectedRoute extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(!this.props.active) {
           return <Redirect to={this.props.redirect} />
        }

        return this.props.children

    }
}