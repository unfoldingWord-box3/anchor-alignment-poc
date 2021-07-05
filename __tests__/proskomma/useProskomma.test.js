import React, { useMemo, useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';
import * as util from 'util';
import {jest} from '@jest/globals'

import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, waitFor, screen, findByTestId  } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import useProskomma from '../../src/hooks/useProskomma';
import useQuery from '../../src/hooks/useQuery';
import useAlignmentAdapter from '../../src/core/alignmentAdapters/useAlignmentAdapter';
import {AlignmentEditor} from 'alignment-editor-rcl';


// it("loads spanish resource", async () => {
//   await act(async () => { render(<ProskommaTestComponent resources={resourcesSpanish} />);  });
//   //expect(container.textContent).toBe("Hey, stranger");

//   //await waitFor(() => );
//   //jest.setTimeout(90*1000);
//   const output = await screen.findByTestId('output', null, { timeout: 90*1000 });

//   console.log(util.inspect(output.innerHTML));
// }, 90*1000);

it("queries spanish resource", async () => {
  await act(async () => { render(
    <QueryTestComponent
      resources={resourcesSpanish}
      queryTemplate={alignmentQueryTemplateSpanish}
     />
  );  });

  const output = await screen.findByTestId('output', null, { timeout: 90*1000 });

  console.log(util.inspect(output.innerHTML));
}, 90*1000);

// it("queries English resource", async () => {
//   await act(async () => { render(
//     <QueryTestComponent
//       resources={resourcesEnglish}
//       queryTemplate={alignmentQueryTemplateEnglish}
//      />
//   );  });

//   const output = await screen.findByTestId('output', null, { timeout: 90*1000 });

//   console.log(util.inspect(output.innerHTML));
// }, 90*1000);

// --- --- ---

const resourcesEnglish = [
  { owner: 'unfoldingWord', lang: 'en', abbr: 'ult', tag: '25' }
];

const resourcesSpanish = [
  // TODO: Proskomma has unhandled parsing issues with this ULB ?
  //{ owner: 'Door43-Catalog', lang: 'es-419', abbr: 'ulb' },
  { owner: 'translate_test', lang: 'es-419', abbr: 'gst' },
];

const resourcesAll = [
  { owner: 'unfoldingWord', lang: 'el-x-koine', abbr: 'ugnt' },
  { owner: 'unfoldingWord', lang: 'en', abbr: 'ult', tag: '25' },
  // TODO: Proskomma has unhandled parsing issues with this ULB ?
  //{ owner: 'Door43-Catalog', lang: 'es-419', abbr: 'ulb' },
  { owner: 'translate_test', lang: 'es-419', abbr: 'gst' },
];

const alignmentQueryTemplateSpanish = `{
  test: docSet(id:"translate_test/es-419_gst") {
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

const alignmentQueryTemplateEnglish = `{
  test: docSet(id:"unfoldingWord/en_ult") {
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


function ProskommaTestComponent ({resources}) {
  const reference = {bookId: 'TIT', chapter: 1, verse: 1};
  const {state: { proskomma, changeIndex }} = useProskomma({ resources, books: [reference.bookId] });
  
  const [state, setState] = useState('');

  useDeepCompareEffect(async () => {
    console.log("proskomma changing state.")
    setState(JSON.stringify(proskomma));
  }, [proskomma]);

  if (proskomma && proskomma.documents && Reflect.ownKeys(proskomma.documents).length > 0)
  {
    console.log("!!! !!!! !!!!!!");
    return <div data-testid='output'>{state}</div>;
  }
  else {
    return <div/>
  }
}

function QueryTestComponent ({resources, queryTemplate}) {
  const reference = {bookId: 'TIT', chapter: 1, verse: 1};

  const query = queryTemplate
    .replace(/%bookCode%/g, reference.bookId || '')
    .replace(/%chapter%/g, reference.chapter)
    .replace(/%verse%/g, reference.verse);
    
  const {state: { proskomma, changeIndex }} = useProskomma({ resources, books: [reference.bookId] });
  const {state: queryState} = useQuery({proskomma, changeIndex, query});
  
  const [state, setState] = useState('');

  useDeepCompareEffect(async () => {
    console.log("query changing state.")
    if (queryState && queryState.data && queryState.data.test && queryState.data.test.document){
      const output = JSON.stringify(queryState.data.test.document.cv);
      setState(output);
      console.log(output);
    }
  }, [queryState]);

  if (queryState && queryState.data && Reflect.ownKeys(proskomma.documents).length > 0)
  {
    console.log("!!! !!!! !!!!!!");
    return <div data-testid='output'>{state}</div>;
  }
  else {
    return <div/>
  }
}

// import { act } from 'react-dom/test-utils';
// //import shallowRender from '../testHelpers/shallowRender';
// import mountRender from '../testHelpers/mountRender';
// test('Load resources into proskomma', async() => {
//   //const wrapper = act(()=> mountRender(<Component/>));
//   const wrapper = mountRender(<Component/>);

//   console.log(JSON.stringify(wrapper));
// });
