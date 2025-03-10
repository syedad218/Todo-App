const styledComponentPropsToNotForward = [
  "completed",
  "isPending",
  "hasLeftIcon",
  "hasRightIcon",
  "flexGrow",
  "marginTop",
  "error",
  "progress",
];

export const shouldForwardProps = (prop: string) =>
  !styledComponentPropsToNotForward.includes(prop);
