import {senses} from '../lexicon/helpers';

// Specially for alignment-editor-rcl.
// TODO: 
export const getSourceGlossesFromTokens = async ({tokens}) => {
    // An array of arrays of senses:
    const tokensSenses = await getSensesFromTokens({tokens});
    // An array of arrays of strings.
    const tokensGlosses = tokensSenses.map(senses => {
        return senses?.map((sense)=>{
            return sense.gloss;// || sense.definition
        })
    });
    // A single array of primitive strings:
    const tokensSingleGlosses = tokensGlosses.map((glosses) => {
        // const singleGlosses = (glosses.filter(gloss => gloss && gloss.length > 0));
        // return [...new Set(singleGlosses)].join().trim();
        
        // TODO: for now, just select FIRST gloss:
        // NOTE: data does not really support this use.
        const singleGloss = (glosses.filter(gloss => gloss && gloss.length > 0));
        return (singleGloss && singleGloss[0].trim()) || null;
    });
    const glosses = tokensSingleGlosses.map((gloss, index) => {
        return {
            position: index,
            glossText: gloss
        };
    });
    console.log(glosses);
    return glosses;
};

// Reusable for proskomma abstractions.
export const getSensesFromTokens = async ({tokens}) => {
    // Lexicon
    return Promise.all(tokens?.map(async (token)=>{
        try {
            //console.log(JSON.stringify(await senses({strong: "G00010"})));
            return await senses({strong: token.strong});
        } catch (error) {
            // DEBUG: TODO: Disable after we diagnose missing words.
            return "ERROR!! " + error;
        }
    }));
};