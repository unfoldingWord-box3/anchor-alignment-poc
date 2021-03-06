import React, { useMemo } from 'react';
import {AlignmentEditor} from 'alignment-editor-rcl';

import useProskomma from '../hooks/useProskomma';
import useAlignmentAdapter from '../core/alignmentAdapters/useAlignmentAdapter';

export default function Component ({reference}) {
  const resources = [
    { owner: 'unfoldingWord', lang: 'el-x-koine', abbr: 'ugnt' },
    { owner: 'unfoldingWord', lang: 'en', abbr: 'ult', tag: '25' },
    // TODO: Proskomma has unhandled parsing issues with this ULB ?
    //{ owner: 'Door43-Catalog', lang: 'es-419', abbr: 'ulb' },
    { owner: 'translate_test', lang: 'es-419', abbr: 'gst' },
  ];

  const {state: { proskomma, changeIndex }} = useProskomma({ resources, books: [reference.bookId] });
  const {state} = useAlignmentAdapter({proskomma, reference, changeIndex});
  
  const onState = (a) => {
    console.log('STATE UPDATED', a);
  };

  return (
          // Strange state issues if we START with null props.
          // TODO: esp investigate referenceLinks.
          state && state.referenceLinks && state.referenceLinks.length > 0
          && <AlignmentEditor
          sourceGlosses={
            state.sourceGlosses
            //null
          }
          sourceSegments={
            state.sourceSegments
            //[{"text":"Παῦλος"},{"text":"δοῦλος"},{"text":"Θεοῦ"},{"text":"ἀπόστολος"},{"text":"δὲ"},{"text":"Ἰησοῦ"},{"text":"Χριστοῦ"},{"text":"κατὰ"},{"text":"πίστιν"},{"text":"ἐκλεκτῶν"},{"text":"Θεοῦ"},{"text":"καὶ"},{"text":"ἐπίγνωσιν"},{"text":"ἀληθείας"},{"text":"τῆς"},{"text":"κατ"},{"text":"εὐσέβειαν"}]
          }

          referenceSegments={
            state.referenceSegments
            //[{"text":"Paul"},{"text":"a"},{"text":"servant"},{"text":"of"},{"text":"God"},{"text":"and"},{"text":"an"},{"text":"apostle"},{"text":"of"},{"text":"Jesus"},{"text":"Christ"},{"text":"for"},{"text":"the"},{"text":"faith"},{"text":"of"},{"text":"the"},{"text":"chosen"},{"text":"people"},{"text":"of"},{"text":"God"},{"text":"and"},{"text":"the"},{"text":"knowledge"},{"text":"of"},{"text":"the"},{"text":"truth"},{"text":"that"},{"text":"agrees"},{"text":"with"},{"text":"godliness"}]
          }
          referenceLinks={
            state.referenceLinks
            //[{"sources":[0],"targets":[0],"type":"manual"},{"sources":[1],"targets":[1,2],"type":"manual"},{"sources":[2],"targets":[3,4],"type":"manual"},{"sources":[3],"targets":[6,7],"type":"manual"},{"sources":[4],"targets":[5],"type":"manual"},{"sources":[5],"targets":[8,9],"type":"manual"},{"sources":[6],"targets":[10],"type":"manual"},{"sources":[7],"targets":[11],"type":"manual"},{"sources":[8],"targets":[12,13],"type":"manual"},{"sources":[9],"targets":[14,15,16,17],"type":"manual"},{"sources":[10],"targets":[18,19],"type":"manual"},{"sources":[11],"targets":[20],"type":"manual"},{"sources":[12],"targets":[21,22],"type":"manual"},{"sources":[13],"targets":[23,24,25],"type":"manual"},{"sources":[14],"targets":[26],"type":"manual"},{"sources":[15],"targets":[27,28],"type":"manual"},{"sources":[16],"targets":[29],"type":"manual"}]
          }

          targetSegments={
            state.targetSegments
            //[{"text":"Павел"},{"text":"раб"},{"text":"Бога"},{"text":"апостол"},{"text":"же"},{"text":"Иисуса"},{"text":"Христа"},{"text":"по"},{"text":"вере"},{"text":"избранных"},{"text":"Бога"},{"text":"и"},{"text":"познанию"},{"text":"истины"},{"text":"согласно"},{"text":"благочестию"}]
          }
          userLinks={
            //state.userLinks
            null
          }

          stateUpdatedHook={onState}
        />
  );
};
