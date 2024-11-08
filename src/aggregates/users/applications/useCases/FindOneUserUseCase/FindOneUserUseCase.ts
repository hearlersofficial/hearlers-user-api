import { Inject, Injectable } from "@nestjs/common";
import { FindOneUserUseCaseRequest } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/dto/FindOneUserUseCase.request";
import { FindOneUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/dto/FindOneUserUseCase.response";
import { Users } from "~/src/aggregates/users/domain/Users";
import { USER_REPOSITORY, UsersRepositoryPort } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";

@Injectable()
export class FindOneUserUseCase implements UseCase<FindOneUserUseCaseRequest, FindOneUserUseCaseResponse> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UsersRepositoryPort,
  ) {}
  async execute(request: FindOneUserUseCaseRequest): Promise<FindOneUserUseCaseResponse> {
    const { userId, nickname } = request;
    const user: Users = await this.usersRepository.findOne({ userId, nickname });
    return {
      ok: true,
      user,
    };
  }
}
