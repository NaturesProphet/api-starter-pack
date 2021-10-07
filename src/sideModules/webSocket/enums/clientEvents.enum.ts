export enum EventosClienteSocket {
  /**
   * Fired upon a successful connection
  */
  CONNECT = 'connect',

  /**
   * Fired upon a connection timeout
  */
  CONNECT_ERROR = 'connect_erro',

  /**
   * Fired upon a connection timeout.
  */
  TIMEOUT = 'connect_timeout',

  /**
   * Fired upon a successful reconnection.
   * @Param Number reconnection attempt number
  */
  RECONNECTT = 'reconnect',

  /**
   * Fired upon an attempt to reconnect.
  */
  RECONNECT_ATTEMPT = 'reconnect_attempt',

  /**
   * Fired upon an attempt to reconnect.
   * @param Number reconnection attempt number
  */
  RECONNECTING = 'reconnecting',

  /**
   *  Fired upon a reconnection attempt error.
   * @Param Object error object
  */
  RECONNECTION_ERROR = 'reconnect_error',

  /**
   * Fired when couldn’t reconnect within reconnectionAttempts
  */
  RECONNECTION_FAILED = 'reconnect_failed',

  /**
   * desconectou
  */
  DISCONNECT = 'disconnect',

  /**
   * erro
  */
  ERR = 'error'

}