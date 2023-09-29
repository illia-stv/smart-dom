import type { ElementType } from "./smart_dom";

export interface CheckCallbackType {
    execute: CheckExecuteCallback;
    name: string;
}
export type CheckExecuteCallback = ( node: Element, arg: any ) => boolean;

export default class Validator {
    private _checkers: Map< string, CheckCallbackType >;

    constructor() {
        this._checkers = new Map();
    }

    setChecker( checkCallback: CheckCallbackType, name: string ): void {
        this._checkers.set( name, checkCallback );
    }

    getChecker( name: string ): CheckCallbackType | undefined {
        return this._checkers.get( name );
    }

    public checkAll ( node: Element, element: ElementType ): boolean {
        for( const [, checker] of this._checkers ) {
            const checkerName = checker.name;

            if ( element && element[ checkerName ] && !checker.execute( node, element[ checkerName ] ) ) {
                return false;
            }
        }
    
        return true;
    }
}
