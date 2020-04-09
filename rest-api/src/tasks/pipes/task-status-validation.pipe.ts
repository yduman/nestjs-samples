import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(status: string) {
    status = status.toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} is an invalid status`);
    }

    return status;
  }

  private isStatusValid(status: any) {
    const i = this.allowedStatuses.indexOf(status);
    return i !== -1;
  }
}
