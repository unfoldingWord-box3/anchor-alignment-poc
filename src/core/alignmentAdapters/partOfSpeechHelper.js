import clearTitusData from './clearTitusData';

/**
 * Returns an array of source segments with PartOfSpeech
 * mapped on using data from Clear.Bible
 * @param {Array} sourceSegments
 * @returns {Array} source segments with PoS 
 */
export default function partOfSpeechHelper(sourceSegments) {
  return sourceSegments.map((sourceSegment, index) => {
    const partOfSpeech = findPartOfSpeech(sourceSegment.text, index)
    return {...sourceSegment, partOfSpeech }
  });
};

function findPartOfSpeech(ugntText, index) {
  return clearTitusData[index]?.partOfSpeech;
};
