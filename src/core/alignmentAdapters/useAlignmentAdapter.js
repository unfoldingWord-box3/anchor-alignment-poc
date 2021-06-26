import { useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';
import useQuery from '../../hooks/useQuery';
import {getAlignmentFromProskomma} from './alignmentHelpers';

export default function useAlignmentAdapter({proskomma, changeIndex}) {
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
    target: docSet(id:"ru_gl/ru_rlob") {
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
  
  // TODO: props or context.
  const selectedBook = 'TIT';
  const selectedChapter = 1;
  const selectedVerse = 1;
  const query = alignmentQueryTemplate
    .replace(/%bookCode%/g, selectedBook || '')
    .replace(/%chapter%/g, selectedChapter)
    .replace(/%verse%/g, selectedVerse);

  // : {query: lastQuery, data, errors, changeIndex: lastChange}
  const defaultState = {
    sourceGlosses: null,
    sourceSegments: [],

    referenceSegments: [],
    referenceLinks: [],

    targetSegments: [],
    userLinks: [],
  };
  const [state, setState] = useState({ ...defaultState });
  const {state: queryState} = useQuery({proskomma, changeIndex, query});
  
  useDeepCompareEffect(async () => {
    if (queryState && queryState.data
        && queryState.data.original?.document
        && queryState.data.bridge?.document
        && queryState.data.target?.document)
    {
      // Align original --> primary GL
      const bridgeAlignments = getAlignmentFromProskomma({
        sourceDocument: queryState.data?.original?.document,
        targetDocument: queryState.data?.bridge?.document
      });
      
      // Align secondary GL --> primary GL
      const targetAlignments = getAlignmentFromProskomma({
        sourceDocument: queryState.data?.original?.document,
        targetDocument: queryState.data?.target?.document
      });

      console.log("useAlignmentAdapter // getAlignmentFromProskomma / data", queryState.data);
      console.log("useAlignmentAdapter // getAlignmentFromProskomma / bridge", bridgeAlignments);
      console.log("useAlignmentAdapter // getAlignmentFromProskomma / target", targetAlignments);

      console.log("useAlignmentAdapter // getAlignmentFromProskomma / align",JSON.stringify(targetAlignments));

      setState({
        sourceGlosses: null,
        sourceSegments: bridgeAlignments.sourceSegments,

        referenceSegments: bridgeAlignments.targetSegments,
        referenceLinks: bridgeAlignments.links,

        targetSegments: targetAlignments.targetSegments,
        userLinks: null,
      });

      console.log("useAlignmentAdapter // state.sourceGlosses", state.sourceGlosses);
      console.log("useAlignmentAdapter // state.sourceSegments", state.sourceSegments);
      
      console.log("useAlignmentAdapter // state.referenceSegments", state.referenceSegments);
      console.log("useAlignmentAdapter // state.referenceLinks", state.referenceLinks);
      
      console.log("useAlignmentAdapter // state.targetSegments", state.targetSegments);
      console.log("useAlignmentAdapter // state.userLinks", state.userLinks);
    }
  }, [proskomma, changeIndex, queryState.changeIndex]);
  
  console.log("useAlignmentAdapter // state", {...state, queryState});

  return {
    state: {...state, ...queryState},
    actions: {},
  };
};
