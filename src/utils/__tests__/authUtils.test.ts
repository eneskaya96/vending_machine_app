import { faker } from "@faker-js/faker";
import * as fc from "fast-check";

import { getTokenExpiredAt, isTokenExpired } from "../authUtils";

describe("checking the token is expired or not", () => {
  it("should return true if expiredAt is not provided", () => {
    const result = isTokenExpired(undefined);
    expect(result).toBe(true);
  });

  it("should return true if expiredAt is less than the current time", () => {
    const pastDate = new Date(faker.date.past()).getTime() / 1000;
    const result = isTokenExpired(pastDate);
    expect(result).toBe(true);
  });

  it("should return false if expiredAt is greater than the current time", () => {
    fc.assert(
      fc.property(
        fc.integer({
          min: Math.ceil(Date.now() / 1000) + 1,
          max: Number.MAX_SAFE_INTEGER,
        }),
        (expiredAt) => {
          const result = isTokenExpired(expiredAt);
          expect(result).toBe(false);
        },
      ),
    );
  });
});

describe("returning the token expiration time as a Unix epoch timestamp.", () => {
  it("should return undefined if token is not provided", () => {
    const result = getTokenExpiredAt(null);
    expect(result).toBeUndefined();
  });

  it("should return undefined if decoding the token fails", () => {
    fc.assert(
      fc.property(fc.string(), (invalidToken) => {
        const result = getTokenExpiredAt(invalidToken);
        expect(result).toBeUndefined();
      }),
    );
  });

  it("should return 1705997813", () => {
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNDZkVtRkt3T3JoNlJ2NExHb3pUSSJ9.eyJpc3MiOiJodHRwczovL2NyZWEtcmVhY3Qtc3RhcnRlci1raXQudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA2NTEyMTI1NzUxNzY4MjQ5MTg2IiwiYXVkIjpbImh0dHBzOi8vY3JlYS1yZWFjdC1zdGFydGVyLWtpdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vY3JlYS1yZWFjdC1zdGFydGVyLWtpdC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1OTk3NzEzLCJleHAiOjE3MDU5OTc4MTMsImF6cCI6ImxPWFB4MTBQU2ljTHlQbUhhTFdiV1VISEVuRHlCazN6Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.GsVAF1uj1UZw-";
    const result = getTokenExpiredAt(token);
    expect(result).toBe(1705997813);
  });
});
