
const doc_original = pk.importDocument(
  selectors={org: 'unfoldingWord', lang: 'el-x-koine',  abbr: 'ugnt'},
  contentType='usfm',
  content=ugnt,
);

const doc_en_bridge = pk.importDocument(
selectors={org: 'unfoldingWord', lang: 'en',  abbr: 'ult'},
contentType='usfm',
content=en_ult,
);

// https://git.door43.org/Door43-Catalog/es-419_ulb/src/branch/master/57-TIT.usfm
const doc_target = pk.importDocument(
  selectors={org: 'rugl', lang: 'ru',  abbr: 'rlob'},
  contentType='usfm',
  content=ru_rlob,
);

const alignmentQueryTemplate = `{
original: docSet(id:"unfoldingWord/el-x-koine_ugnt") {
  document(bookCode:"%bookCode%") {
    cv(
      chapter:"%chapter%"
      verses:"%verse%"
      includeContext: true
      ) {
      tokens {payload scopes}
    }
  }
}
bridge: docSet(id:"unfoldingWord/en_ult") {
  document(bookCode:"%bookCode%") {
    cv(
      chapter:"%chapter%"
      verses:"%verse%"
      includeContext: true
      ) {
      tokens {payload scopes}
    }
  }
}
target: docSet(id:"rugl/ru_rlob") {
  document(bookCode:"%bookCode%") {
    cv(
      chapter:"%chapter%"
      verses:"%verse%"
      includeContext: true
      ) {
      tokens {payload scopes}
    }
  }
}
}`;

const selectedBook = 'TIT';
const selectedChapter = 1;
const selectedVerse = 1;

const query = alignmentQueryTemplate
.replace(/%bookCode%/g, selectedBook || '')
.replace(/%chapter%/g, selectedChapter)
.replace(/%verse%/g, selectedVerse);
