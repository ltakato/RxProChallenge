import {gCall} from "../../test-utils/gCall";
import {Connection} from "typeorm";
import {testConn} from "../../test-utils/testConnection";

const signUpMutation = `
mutation SignUp($userSignUpInput: UserSignUpInput!) {
  signUp(UserSignUpInput: $userSignUpInput) {
    token
  }
}`;

const loginQuery = `
query Login($userLoginInput: UserLoginInput!) {
  login(UserLoginInput: $userLoginInput) {
    token
    user {
      email
    }
  }
}`;

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

describe("userResolver - signUp", () => {
  it("Should throw error if passed email is already in use", async () => {
    const signUpInput = {
      userSignUpInput: {
        name: "test",
        email: "test@titles.com",
        password: "test2022"
      }
    };

    await gCall({
      source: signUpMutation,
      variableValues: signUpInput
    });

    const response = await gCall({
      source: signUpMutation,
      variableValues: signUpInput
    });

    expect(response.errors).toHaveLength(1)
  })
})

describe("userResolver - login", () => {
  it("Should throw error if passed email does not exist", async () => {
    const loginInput = {
      userLoginInput: {
        email: "test2@titles.com",
        password: "test2022"
      }
    };

    const response = await gCall({
      source: loginQuery,
      variableValues: loginInput
    });

    expect(response.errors).toHaveLength(1)
  })

  it("Should throw error if passed wrong password", async () => {
    const loginInput = {
      userLoginInput: {
        email: "test@titles.com",
        password: "test2022wrong"
      }
    };

    const response = await gCall({
      source: loginQuery,
      variableValues: loginInput
    });

    expect(response.errors).toHaveLength(1)
  })
})
