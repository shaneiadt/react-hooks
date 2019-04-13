import React from 'react';

const auth = React.createContext({ status: false, login: () => { } });

export default auth;