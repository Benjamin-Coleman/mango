import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    state = {
        isFixed: false,
        isActive: false
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollUpdate)
    }

    componentWillUnmount() {
        window.removeEventListener(this.scrollUpdate)
    }

    scrollUpdate = () => {
        if (window.pageYOffset > 50) {
            this.setState(prevState => (
                Object.assign({}, prevState, {isFixed: true})
                )
            )
        } else {
            this.setState(prevState => (
                Object.assign({}, prevState, {isFixed: false})
            ))
        }
    }

    render() {
        console.log('state: ', this.state)
        return (
            <header className={this.state.isFixed ? 'fixed' : ''}>
                
            </header>
        )
    }
}

export default Header