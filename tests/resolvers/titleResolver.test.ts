import {gCall} from "../../test-utils/gCall";
import {Connection} from "typeorm";
import {testConn} from "../../test-utils/testConnection";

const updateTitleMutation = `
mutation UpdateTitle($titleUpdateInput: TitleUpdateInput!) {
  updateTitle(TitleUpdateInput: $titleUpdateInput) {
    id
    name
  }
}
`;

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

describe("titleResolver - updateTitle", () => {
  it("Should throw error if not find passed title", async () => {
    const updateInput = {
      titleUpdateInput: {
        id: "92d6a4d0-39ff-4727-a9c0-5921223fef21",
        name: "naruto shippuden"
      }
    };

    const response = await gCall({
      source: updateTitleMutation,
      variableValues: updateInput
    });

    expect(response.errors).toHaveLength(1)
  })
})
