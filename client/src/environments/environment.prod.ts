// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export class Environment {
  public static production = false;

  public static BASE_URL = "http://127.0.0.1:3000";
  public static WS_URL = "http://127.0.0.1:3030";

  public static FIRST_SIMPLE_REQUEST: () => string = () => `${Environment.BASE_URL}/1d-1/request`;
  public static FIRST_SIMPLE_GUESS: (sessionId) => string = (sessionId) => `${Environment.BASE_URL}/1d-1/guess/${sessionId}`;

  public static FIRST_COMPLEX_REQUEST: () => string = () => `${Environment.BASE_URL}/1d-2/request`;
  public static FIRST_COMPLEX_GUESS: (sessionId) => string = (sessionId) => `${Environment.BASE_URL}/1d-2/guess/${sessionId}`;

  public static SECOND_SIMPLE_REQUEST: () => string = () => `${Environment.BASE_URL}/2d-1/request`;
  public static SECOND_SIMPLE_GUESS: (sessionId) => string = (sessionId) => `${Environment.BASE_URL}/2d-1/guess/${sessionId}`;

  public static SECOND_COMPLEX_REQUEST: () => string = () => `${Environment.BASE_URL}/2d-2/request`;
  public static SECOND_COMPLEX_GUESS: (sessionId) => string = (sessionId) => `${Environment.BASE_URL}/2d-2/guess/${sessionId}`;
}
