const LOCAL_STORAGE_ITEM_CONFIG = 'synthesis_config';

const DEFAULT_SYNTHESIS_CONFIG = {
    numOfAnts: 20,
    numOfIterations: 30,
    alpha: 2.0,
    beta: 1.5,
    evaporationRate: 0.3,
    localLoops: 4,
    searchDepth: 6,
};

export function updateSynthesisConfig(config) {
    const configJSON = JSON.stringify(config);
    window.localStorage.setItem(LOCAL_STORAGE_ITEM_CONFIG, configJSON);
}

export function getSynthesisConfig() {
    const storedConfig = window.localStorage.getItem(LOCAL_STORAGE_ITEM_CONFIG);
    if (!storedConfig) {
        return DEFAULT_SYNTHESIS_CONFIG;
    }

    return JSON.parse(storedConfig);
}
