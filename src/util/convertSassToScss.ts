import { traverseAst } from '@/util/traverseAst';
import { addSemicolon } from '@/util/addSemicolon';
import { formatScss } from '@/util/formatScss';
import { sassMixinIncludeHack } from '@/util/sassMixinIncludeHack';
import { sassMixinDefinitionHack } from '@/util/sassMixinDefinitionHack';

let sast: any;

export async function convertSassToScss(sassStr: string): Promise<string> {
    sast = sast || await import('sast');

    const ast = sast.parse(sassStr, { syntax: 'sass' });

    traverseAst(ast, addSemicolon);
    traverseAst(ast, sassMixinIncludeHack);
    traverseAst(ast, sassMixinDefinitionHack);

    const stringifiedTree = sast.stringify(ast, { syntax: 'scss' });

    return formatScss(stringifiedTree);
}
