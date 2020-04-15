import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
  @Query(returns => LessonType)
  lesson() {
    return {
      id: 'foobar123',
      name: 'CS50',
      startDate: new Date().toISOString,
      endDate: new Date().toISOString,
    };
  }
}
