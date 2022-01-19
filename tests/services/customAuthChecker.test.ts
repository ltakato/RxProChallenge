import {ResolverData} from "type-graphql";
import { mock } from 'jest-mock-extended';

import {Context, customAuthChecker} from "../../services/authChecker";

describe("customAuthChecker", () => {
  it("should return valid if contains user", () => {
    const userMock = {
      id: "1",
      email: "user@email.com",
      name: "test user",
      password: "test"
    }
    const resolverData = mock<ResolverData<Context>>();
    resolverData.context.user = userMock;
    expect(customAuthChecker(resolverData, [])).toBe(true)
  })

  it("should return invalid if not contains user", () => {
    const resolverData = mock<ResolverData<Context>>();
    resolverData.context.user = undefined;
    expect(customAuthChecker(resolverData, [])).toBe(false)
  })
})
