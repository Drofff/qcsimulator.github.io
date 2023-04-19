const LOCAL_STORAGE_ITEM_CONFIG = 'synthesis_config';

const DEFAULT_SYNTHESIS_CONFIG = {
    numOfAnts: 20,
    numOfIterations: 30,
    alpha: 2.0,
    beta: 1.5,
    evaporationRate: 0.3,
    localLoops: 4,
    searchDepth: 6,
    disableNegativeControl: true,
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

export function synthesize(tt, onResult) {
    const conf = getSynthesisConfig();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/api/v1/synth');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onload = () => {
        if (xhr.status !== 200) {
            throw new Error(`got status ${xhr.status}`);
        }

        const resp = JSON.parse(xhr.responseText);

        window.alert(`Successfully synthesized a circuit with ${resp.errorsCount} errors`);

        let circuit = [];
        for (const gate of resp.gates) {
            if (gate.type !== 'toffoli') {
                throw new Error('unknown gate type ' + gate.type);
            }
            circuit.push({
                type: 'x',
                time: circuit.length,
                targets: gate.targetBits,
                controls: gate.controlBits,
            });
        }

        onResult({
            gates: [],
            circuit,
            qubits: tt.in[0].length,
            input: tt.in[0],
        });
    };
    xhr.send(JSON.stringify({
        config: conf,
        target: { inputs: tt.in, outputs: tt.out },
    }));
}
