import React from 'react';
import {AlignmentEditor} from 'alignment-editor-rcl';

import useProskomma from '../hooks/useProskomma';
import useQuery from '../hooks/useQuery';


export default function Component (props) {
  // 1. set reference {book: 'tit', chapter: 2, verse: 1}
    // bible-reference-rcl 
    const books = [ 'tit' ];
    const reference = { book: books[0], chapter: 1, verse: 1};
  // 2. fetch Titus from source, gateway, and target
    // proskui (abstract file fetching from proskomma import)
    const resources = [
      { owner: 'unfoldingWord', lang: 'el-x-koine', abbr: 'ugnt' },
      { owner: 'unfoldingWord', lang: 'en', abbr: 'ult', tag: '25' },
      { owner: 'Door43-Catalog', lang: 'es-419', abbr: 'ulb' },
    ];
  // 3. parse usfm/alignment data
    // proskui (proskomma import hook)
    const {state: { proskomma, changeIndex }} = useProskomma({ resources, books });
    const query = ``;
    const {state: {query: lastQuery, data, errors, changeIndex: lastChange}} = useQuery({proskomma, changeIndex, query});
  
  // 4. fetch glosses for current verse
    // ?? strongs number from word objects in usfm => lexicon lookup
    // create custom hook
  // 5. render alignment editor
    // return in this component

  const sourceGlosses = [
    { position: 2, glossText: 'anyone' },
    { position: 5, glossText: 'hearer' },
    { position: 12, glossText: 'doer' },
    { position: 17, glossText: 'man' },
    { position: 23, glossText: 'natural' },
  ];
  const sourceSegments = [
    { text: 'ὅτι', type: 'source', position: 0 },
    { text: 'εἴ', type: 'source', position: 1 },
    { text: 'τις', type: 'source', position: 2 },
    { text: 'ἀκροατὴς', type: 'source', position: 3 },
    { text: 'λόγου', type: 'source', position: 4 },
    { text: 'ἐστὶν', type: 'source', position: 5 },
    { text: 'καὶ', type: 'source', position: 6 },
    { text: 'οὐ', type: 'source', position: 7 },
    { text: 'ποιητής', type: 'source', position: 8 },
    { text: 'οὗτος', type: 'source', position: 9 },
    { text: 'ἔοικεν', type: 'source', position: 10 },
    { text: 'ἀνδρὶ', type: 'source', position: 11 },
    { text: 'κατανοοῦντι', type: 'source', position: 12 },
    { text: 'τὸ', type: 'source', position: 13 },
    { text: 'πρόσωπον', type: 'source', position: 14 },
    { text: 'τῆς', type: 'source', position: 15 },
    { text: 'γενέσεως', type: 'source', position: 16 },
    { text: 'αὐτοῦ', type: 'source', position: 17 },
    { text: 'ἐν', type: 'source', position: 18 },
    { text: 'ἐσόπτρῳ', type: 'source', position: 19 },
  ];
  const referenceSegments = [
    { text: 'Porque', type: 'reference', position: 0 },
    { text: 'si', type: 'reference', position: 1 },
    { text: 'alguien', type: 'reference', position: 2 },
    { text: 'es', type: 'reference', position: 3 },
    { text: 'oidor', type: 'reference', position: 4 },
    { text: 'de', type: 'reference', position: 5 },
    { text: 'la', type: 'reference', position: 6 },
    { text: 'palabra', type: 'reference', position: 7 },
    { text: 'y', type: 'reference', position: 8 },
    { text: 'no', type: 'reference', position: 9 },
    { text: 'hacedor', type: 'reference', position: 10 },
    { text: 'es', type: 'reference', position: 11 },
    { text: 'como', type: 'reference', position: 12 },
    { text: 'un', type: 'reference', position: 13 },
    { text: 'hombre', type: 'reference', position: 14 },
    { text: 'que', type: 'reference', position: 15 },
    { text: 'mira', type: 'reference', position: 16 },
    { text: 'fijamenta', type: 'reference', position: 17 },
    { text: 'su', type: 'reference', position: 18 },
    { text: 'rostro', type: 'reference', position: 19 },
    { text: 'natural', type: 'reference', position: 20 },
    { text: 'en', type: 'reference', position: 21 },
    { text: 'un', type: 'reference', position: 22 },
    { text: 'espejo', type: 'reference', position: 23 },
  ];
  const targetSegments = [
    { text: 'For', type: 'target', position: 0 },
    { text: 'if', type: 'target', position: 1 },
    { text: 'anyone', type: 'target', position: 2 },
    { text: 'is', type: 'target', position: 3 },
    { text: 'a', type: 'target', position: 4 },
    { text: 'hearer', type: 'target', position: 5 },
    { text: 'of', type: 'target', position: 6 },
    { text: 'the', type: 'target', position: 7 },
    { text: 'word', type: 'target', position: 8 },
    { text: 'and', type: 'target', position: 9 },
    { text: 'not', type: 'target', position: 10 },
    { text: 'a', type: 'target', position: 11 },
    { text: 'doer', type: 'target', position: 12 },
    { text: 'he', type: 'target', position: 13 },
    { text: 'is', type: 'target', position: 14 },
    { text: 'like', type: 'target', position: 15 },
    { text: 'a', type: 'target', position: 16 },
    { text: 'man', type: 'target', position: 17 },
    { text: 'who', type: 'target', position: 18 },
    { text: 'looks', type: 'target', position: 19 },
    { text: 'intently', type: 'target', position: 20 },
    { text: 'at', type: 'target', position: 21 },
    { text: 'his', type: 'target', position: 22 },
    { text: 'natural', type: 'target', position: 23 },
    { text: 'face', type: 'target', position: 24 },
    { text: 'in', type: 'target', position: 25 },
    { text: 'a', type: 'target', position: 26 },
    { text: 'mirror', type: 'target', position: 27 },
  ];
  const userLinks = [
    { sources: [2], targets: [2], type: 'manual' },
    { sources: [7], targets: [8], type: 'manual' },
    { sources: [23], targets: [27], type: 'manual' },
  ];
  const referenceLinks = [
    { sources: [3], targets: [4], type: 'manual' },
    { sources: [4], targets: [7], type: 'manual' },
    { sources: [19], targets: [23], type: 'manual' },
  ];
  const onState = (a) => {
    console.log('STATE UPDATED', a);
  };


  return (
    <AlignmentEditor
      sourceGlosses={sourceGlosses}
      sourceSegments={sourceSegments}
      referenceSegments={referenceSegments}
      targetSegments={targetSegments}
      userLinks={userLinks}
      referenceLinks={referenceLinks}
      stateUpdatedHook={onState}
    />
  );
};
