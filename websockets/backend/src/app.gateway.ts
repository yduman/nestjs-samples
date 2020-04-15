import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new msg')
  handleMessage(client: Socket, payload: any): void {
    this.logger.verbose(`payload: ${JSON.stringify(payload)}`);
    this.server.emit('new msg', payload);
  }

  afterInit(server: Server) {
    this.logger.log('afterInit() called!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client with ID "${client.id}" connected!`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client with ID "${client.id}" disconnected!`);
  }
}
