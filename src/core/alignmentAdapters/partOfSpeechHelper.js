import clearTitusData from './clearTitusData';

/**
 * Returns an array of source segments with PartOfSpeech
 * mapped on using data from Clear.Bible
 * @param {Array} sourceSegments
 * @returns {Array} source segments with PoS
 */
export default function partOfSpeechHelper(sourceSegments) {
  return sourceSegments.map((sourceSegment) => {
    const partOfSpeech = findPartOfSpeech(sourceSegment.text)
    return {...sourceSegment, partOfSpeech }
  });
};

function findPartOfSpeech(ugntText) {
  const normalizedText = normalize(ugntText);

  const clearDatum = clearTitusData.find((datum) => {
    const normalizedDatumText = normalize(datum.ugnt);
    return normalizedDatumText === normalizedText;
  });

  /**
   * Verbs are anchor terms, participles are not.
   * To make things easy, we'll call participial verbs "participles".
   * The RCL will only highlight verbs, nouns, and adjectives as
   * anchor terms.
   **/
  if (clearDatum?.partOfSpeech === "verb" && clearDatum?.mood === "Participle") {
    return "participle"
  }

  return clearDatum?.partOfSpeech;
};

function normalize(stringThing) {
  return stringThing.normalize("NFC");
}
