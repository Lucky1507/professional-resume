import { Document, Paragraph, TextRun, Packer, HeadingLevel } from 'docx';

export const generateDOCX = (resumeData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with name
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: resumeData.basicInfo.name,
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Contact info
        new Paragraph({
          children: [
            new TextRun({
              text: `${resumeData.basicInfo.email} | ${resumeData.basicInfo.phone}`,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        }),

        // Summary
        new Paragraph({
          children: [
            new TextRun({
              text: resumeData.basicInfo.summary,
              size: 22,
            }),
          ],
          spacing: { after: 300 },
        }),

        // Experience Section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          text: "Experience",
          spacing: { before: 400 },
        }),

        ...resumeData.experience.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.position}`,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: ` at ${exp.company}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: exp.duration,
                italics: true,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: exp.description,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),
        ]),

        // Add education section similarly
      ],
    }],
  });

  return Packer.toBlob(doc);
};