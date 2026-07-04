export function isHiddenDraft(
  draft: boolean | undefined,
  nodeEnv: string | undefined = process.env.NODE_ENV
): boolean {
  return draft === true && nodeEnv === 'production';
}
