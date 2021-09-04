import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={props.username} onChange={props.handleUsernameChange} />
                <label>Password</label>
                <input type="text" name="password" value={props.password} onChange={props.handlePasswordChange} />
                <input type='submit' />
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm
