interface CrewInfoType {
  slackId: string;
  displayName: string;
}

interface ReviewInfoType extends CrewInfoType {
  notionLink: string;
}

export { CrewInfoType, ReviewInfoType };
