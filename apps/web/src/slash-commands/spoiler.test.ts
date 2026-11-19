/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";

import { setUpCommandTest } from "./__mocks__";

describe("/spoiler", () => {
    const roomId = "!room:example.com";

    it("renders Markdown inside the spoiler", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler the **secret** plan");

        const content = await command.run(client, roomId, null, "the **secret** plan").promise;

        expect(content).toMatchObject({
            body: "the **secret** plan",
            format: "org.matrix.custom.html",
            formatted_body: expect.stringMatching(/<span data-mx-spoiler>.*<strong>secret<\/strong> plan<\/span>/),
        });
    });

    it("keeps plain text unchanged inside the spoiler", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler secret");

        const content = await command.run(client, roomId, null, "secret").promise;

        expect(content).toMatchObject({
            body: "secret",
            formatted_body: "<span data-mx-spoiler>secret</span>",
        });
    });
});
