import { Users } from "~/src/aggregates/users/domain/users";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface FindOneUserUseCaseResponse extends UseCaseCoreResponse {
  user?: Users;
}
