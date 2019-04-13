import React, { useContext } from 'react'

import AuthContext from '../auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <button onClick={auth.login}>Log In!</button>
        </div>
    )
}

export default Auth
