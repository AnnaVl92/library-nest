import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { toBookCommentResponse } from './book-comment.mapper';
import { BookCommentsService } from './book-comments.service';
import {
  BookCommentResponseDto,
  CreateBookCommentDto,
  UpdateBookCommentDto,
} from './dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookCommentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly bookCommentsService: BookCommentsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('addComment')
  async handleAddComment(
    client: Socket,
    payload: CreateBookCommentDto,
  ): Promise<{ event: 'commentCreated'; data: BookCommentResponseDto }> {
    const comment = await this.bookCommentsService.createBookComment(payload);
    const data = toBookCommentResponse(comment);
    this.server.emit('commentCreated', data);
    return { event: 'commentCreated', data };
  }

  @SubscribeMessage('getAllComments')
  async handleGetAllComments(
    client: Socket,
    payload: { bookId: string },
  ): Promise<{ event: 'commentsList'; data: BookCommentResponseDto[] }> {
    const comments = await this.bookCommentsService.findAllBookComment(
      payload.bookId,
    );
    const data = comments.map(toBookCommentResponse);
    return { event: 'commentsList', data };
  }

  @SubscribeMessage('getComment')
  async handleGetComment(
    client: Socket,
    payload: { id: string },
  ): Promise<{ event: 'comment'; data: BookCommentResponseDto }> {
    const comment = await this.bookCommentsService.getBookComment(payload.id);
    return { event: 'comment', data: toBookCommentResponse(comment) };
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(
    client: Socket,
    payload: { id: string; data: UpdateBookCommentDto },
  ): Promise<{ event: 'commentUpdated'; data: BookCommentResponseDto }> {
    const comment = await this.bookCommentsService.updateBookComment(
      payload.id,
      payload.data,
    );
    const data = toBookCommentResponse(comment);
    this.server.emit('commentUpdated', data);
    return { event: 'commentUpdated', data };
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(
    client: Socket,
    payload: { id: string },
  ): Promise<{ event: 'commentDeleted'; data: BookCommentResponseDto }> {
    const comment = await this.bookCommentsService.deleteBookComment(
      payload.id,
    );
    const data = toBookCommentResponse(comment);
    this.server.emit('commentDeleted', data);
    return { event: 'commentDeleted', data };
  }
}
