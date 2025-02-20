const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createItem(data, fileUrls) {
  try {
    const collection = await prisma.collection.findUnique({
        where: {
            id: data.collectionId
        }
    })
    if(collection==null){
        throw new Error("Collection not found!");
    }

    const item = await prisma.item.create({
      data: {
        title: data.title,
        authors: data.authors ? data.types.split(',') : [],
        otherTitles: data.otherTitles ? data.types.split(',') : [],
        dateOfIssue: new Date(data.dateOfIssue),
        publisher: data.publisher || null,
        citation: data.citation || null,
        seriesReports: data.seriesReports ? JSON.parse(data.seriesReports) : null,
        identifiers: data.identifiers ? JSON.parse(data.identifiers) : null,
        types: data.types.split(','),
        language: data.language || null,
        subjectKeywords: data.subjectKeywords || null,
        abstract: data.abstract || null,
        sponsors: data.sponsors || null,
        description: data.description || null,
        files: fileUrls,
        licenseConfirmed: data.licenseConfirmed === 'true',
        collectionId: data.collectionId,
        createdById: data.creatorId
      }
    });

    return item;
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Failed to create item');
  }
}

module.exports = { createItem };
