import rest from "./api";
import { GetStoriesParams, GetStoriesResponse } from "./types";

const StoryService = {
  getStories: (body: GetStoriesParams) =>
    rest.get<GetStoriesResponse>(`/${body.username}/stories`),
};

export default StoryService;
