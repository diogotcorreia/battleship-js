import React from 'react';

const SocketContext = React.createContext(true);

export const SocketProvider = SocketContext.Provider;
export const SocketConsumer = SocketContext.Consumer;
export default SocketContext;
