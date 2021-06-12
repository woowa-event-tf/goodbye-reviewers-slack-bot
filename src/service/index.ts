import { CrewInfoType, ReviewInfoType } from "../type";

const groupingCrews = (crews: CrewInfoType[], by = 25) =>
  crews.length
    ? [crews.slice(0, by), ...groupingCrews(crews.slice(by), by)]
    : [];

const getNamesFromCrews = (crews: CrewInfoType[]) =>
  crews.map((crew) => crew.displayName);

const createSummaryCrewText = (crews: CrewInfoType[]) =>
  `${getNamesFromCrews(crews).join(", ")} *[총 ${crews.length}명]*`;

const createMessage = (reviewer: ReviewInfoType, crews: CrewInfoType[]) =>
  `<@${reviewer.slackId}>
  ${createSummaryCrewText(crews)} 님께서 ${
    reviewer.notionLink
  } 로 리뷰요청을 보냈습니다. \`\`\`[0단계 - 이별 미션] 프론트엔드 크루 ${
    crews.length
  }명 미션 제출합니다.\`\`\``;

export { groupingCrews, createMessage };
