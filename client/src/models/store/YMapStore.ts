export interface YMapState {
    yMapRef: any,
    yMaps: any
}

export interface YMapAction {
    type: 'SET-yMap'
    state: YMapState
}