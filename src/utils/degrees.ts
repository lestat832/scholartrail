export const commonDegrees = [
  "Associate of Applied Science (AAS)",
  "Associate of Arts (AA)",
  "Associate of Science (AS)",
  "Bachelor of Arts (BA)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Education (BEd)",
  "Bachelor of Engineering (BEng)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Science (BS)",
  "Bachelor of Science in Business Administration (BSBA)",
  "Bachelor of Science in Engineering (BSE)",
  "Bachelor of Science in Nursing (BSN)",
  "Bachelor of Social Work (BSW)",
  "Doctor of Business Administration (DBA)",
  "Doctor of Education (EdD)",
  "Doctor of Medicine (MD)",
  "Doctor of Philosophy (PhD)",
  "Juris Doctor (JD)",
  "Master of Arts (MA)",
  "Master of Business Administration (MBA)",
  "Master of Education (MEd)",
  "Master of Engineering (MEng)",
  "Master of Fine Arts (MFA)",
  "Master of Laws (LLM)",
  "Master of Public Administration (MPA)",
  "Master of Public Health (MPH)",
  "Master of Science (MS)",
  "Master of Social Work (MSW)"
];

export const searchDegrees = (searchTerm: string): string[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return commonDegrees
    .filter(degree => degree.toLowerCase().includes(lowercaseSearch))
    .slice(0, 10); // Return max 10 suggestions
};