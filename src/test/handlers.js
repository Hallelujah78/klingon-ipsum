import { http, HttpResponse } from "msw";
import klingonWords from "../data/data.jsx";

const handlers = [
  http.get(
    "https://51da59d1-d13c-47cf-a520-6486e16c9a70.mock.pstmn.io/v1/home/klingon",
    () => {
      return HttpResponse.json({
        data: klingonWords,
        isLoading: false,
        isError: false,
      });
    }
  ),
];

export default handlers;
