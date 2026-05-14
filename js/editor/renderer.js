import { getInputCount } from './gates.js';

const SVG_GATES = {
    AND: {
        src: './img/Portas/porta-and.svg',
        viewBox: { width: 160, height: 100 },
        inputs: [
            { x: 15, y: 35 },
            { x: 15, y: 65 }
        ],
        output: { x: 145, y: 50 }
    },
    OR: {
        src: './img/Portas/porta-or.svg',
        viewBox: { width: 200, height: 120 },
        inputs: [
            { x: 15, y: 40 },
            { x: 15, y: 80 }
        ],
        output: { x: 185, y: 60 }
    },
    NOT: {
        src: './img/Portas/porta-not.svg',
        viewBox: { width: 100, height: 60 },
        inputs: [{ x: 20, y: 30 }],
        output: { x: 100, y: 30 }
    },
    NAND: {
        src: './img/Portas/porta-nand.svg',
        viewBox: { width: 300, height: 200 },
        inputs: [
            { x: 50, y: 70 },
            { x: 50, y: 130 }
        ],
        output: { x: 270, y: 100 }
    },
    NOR: {
        src: './img/Portas/porta-nor.svg',
        viewBox: { width: 300, height: 200 },
        inputs: [
            { x: 50, y: 70 },
            { x: 50, y: 130 }
        ],
        output: { x: 270, y: 100 }
    },
    XOR: {
        src: './img/Portas/porta-xor.svg',
        viewBox: { width: 300, height: 200 },
        inputs: [
            { x: 50, y: 70 },
            { x: 50, y: 130 }
        ],
        output: { x: 270, y: 100 }
    },
    XNOR: {
        src: './img/Portas/porta-xnor.svg',
        viewBox: { width: 300, height: 200 },
        inputs: [
            { x: 50, y: 70 },
            { x: 50, y: 130 }
        ],
        output: { x: 270, y: 100 }
    }
};

function createPin({ x, y }, viewBox, type, gateId, index) {
    const pin = document.createElement('div');
    pin.className = `pin ${type}`;
    pin.dataset.pinType = type;
    pin.dataset.gateId = gateId;
    pin.dataset.pinIndex = String(index);
    pin.style.left = `${(x / viewBox.width) * 100}%`;
    pin.style.top = `${(y / viewBox.height) * 100}%`;
    return pin;
}

function addDeleteButton(node, gateId) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'node-delete';
    button.dataset.action = 'delete-node';
    button.dataset.gateId = gateId;
    button.textContent = 'x';
    node.appendChild(button);
}

export function renderGate(gate, nodeLayer) {
    const node = document.createElement('div');
    node.className = 'node';
    node.dataset.gateId = gate.id;
    node.style.left = `${gate.x}px`;
    node.style.top = `${gate.y}px`;

    const svgGate = SVG_GATES[gate.type];
    if (svgGate) {
        node.classList.add('node-svg');

        const graphic = document.createElement('div');
        graphic.className = 'node-graphic';
        const aspect = svgGate.viewBox.height / svgGate.viewBox.width;
        const width = 140;
        const height = Math.round(width * aspect);
        graphic.style.width = `${width}px`;
        graphic.style.height = `${height}px`;

        const img = document.createElement('img');
        const inputCount = gate.inputs?.length ?? getInputCount(gate.type);
        let src = svgGate.src;
        try {
            if (inputCount === 3) {
                src = `./img/portas-fios/porta-${gate.type.toLowerCase()}-tree.svg`;
            } else if (inputCount >= 4) {
                src = `./img/portas-fios/porta-${gate.type.toLowerCase()}-for.svg`;
            }
        } catch (e) {
            src = svgGate.src;
        }
        img.src = src;
        img.alt = `${gate.type} gate`;
        graphic.appendChild(img);
        const leftX = svgGate.inputs && svgGate.inputs[0] ? svgGate.inputs[0].x : 15;
        
        for (let i = 0; i < inputCount; i += 1) {
            const spacing = svgGate.viewBox.height / (inputCount + 1);
            const point = { x: leftX, y: spacing * (i + 1) };
            const pin = createPin(point, svgGate.viewBox, 'input', gate.id, i);
            graphic.appendChild(pin);
        }

        const outputPin = createPin(svgGate.output, svgGate.viewBox, 'output', gate.id, 0);
        graphic.appendChild(outputPin);

        node.appendChild(graphic);
        addDeleteButton(node, gate.id);
    
        if (!['INPUT', 'OUTPUT', 'NOT'].includes(gate.type)) {
            const ctrl = document.createElement('div');
            ctrl.className = 'input-count-control';
            ctrl.innerHTML = `
                <button type="button" class="small-btn" data-action="dec-inputs" data-gate-id="${gate.id}">-</button>
                <span class="input-count" data-gate-id="${gate.id}">${gate.inputs?.length ?? getInputCount(gate.type)}</span>
                <button type="button" class="small-btn" data-action="inc-inputs" data-gate-id="${gate.id}">+</button>
            `;
            node.appendChild(ctrl);
        }
        nodeLayer.appendChild(node);
        return node;
    }

    const body = document.createElement('div');
    body.className = 'node-body';

    if (gate.type === 'INPUT') {
        const row = document.createElement('div');
        row.className = 'pin-row';

        const label = document.createElement('select');
        label.className = 'input-label';
        label.dataset.action = 'set-label';
        label.dataset.gateId = gate.id;
        for (let code = 65; code <= 90; code += 1) {
            const option = document.createElement('option');
            option.value = String.fromCharCode(code);
            option.textContent = String.fromCharCode(code);
            label.appendChild(option);
        }
        label.value = gate.label || 'A';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'input-toggle';
        toggle.textContent = gate.output ? '1' : '0';
        toggle.dataset.action = 'toggle-input';

        const outputPin = document.createElement('div');
        outputPin.className = 'pin output';
        outputPin.dataset.pinType = 'output';
        outputPin.dataset.gateId = gate.id;
        outputPin.dataset.pinIndex = '0';

        row.appendChild(label);
        row.appendChild(toggle);
        row.appendChild(outputPin);
        body.appendChild(row);
    } else if (gate.type === 'OUTPUT') {
        const row = document.createElement('div');
        row.className = 'pin-row';

        const inputPin = document.createElement('div');
        inputPin.className = 'pin input';
        inputPin.dataset.pinType = 'input';
        inputPin.dataset.gateId = gate.id;
        inputPin.dataset.pinIndex = '0';

        const label = document.createElement('span');
        label.textContent = 'OUT';

        const value = document.createElement('div');
        value.className = 'node-value';
        value.dataset.role = 'output-value';
        value.textContent = '0';

        row.appendChild(inputPin);
        row.appendChild(label);
        body.appendChild(row);
        body.appendChild(value);
    } else {
        const inputCount = gate.inputs?.length ?? getInputCount(gate.type);
        for (let i = 0; i < inputCount; i += 1) {
            const row = document.createElement('div');
            row.className = 'pin-row';

            const label = document.createElement('span');
            label.textContent = `IN ${i + 1}`;

            const inputPin = document.createElement('div');
            inputPin.className = 'pin input';
            inputPin.dataset.pinType = 'input';
            inputPin.dataset.gateId = gate.id;
            inputPin.dataset.pinIndex = String(i);

            row.appendChild(label);
            row.appendChild(inputPin);
            body.appendChild(row);
        }

        const outRow = document.createElement('div');
        outRow.className = 'pin-row';

        const outLabel = document.createElement('span');
        outLabel.textContent = 'OUT';

        const outputPin = document.createElement('div');
        outputPin.className = 'pin output';
        outputPin.dataset.pinType = 'output';
        outputPin.dataset.gateId = gate.id;
        outputPin.dataset.pinIndex = '0';

        outRow.appendChild(outLabel);
        outRow.appendChild(outputPin);
        body.appendChild(outRow);
    }

    node.appendChild(body);
    addDeleteButton(node, gate.id);
    if (!['INPUT', 'OUTPUT', 'NOT'].includes(gate.type)) {
        const ctrl = document.createElement('div');
        ctrl.className = 'input-count-control';
        ctrl.innerHTML = `
            <button type="button" class="small-btn" data-action="dec-inputs" data-gate-id="${gate.id}">-</button>
            <span class="input-count" data-gate-id="${gate.id}">${gate.inputs?.length ?? getInputCount(gate.type)}</span>
            <button type="button" class="small-btn" data-action="inc-inputs" data-gate-id="${gate.id}">+</button>
        `;
        node.appendChild(ctrl);
    }
    nodeLayer.appendChild(node);

    return node;
}

export function updateGatePosition(node, gate) {
    node.style.left = `${gate.x}px`;
    node.style.top = `${gate.y}px`;
}

export function updateGateValues(gate, node) {
    const outputPin = node.querySelector('.pin.output');
    if (outputPin) {
        outputPin.classList.toggle('active', gate.output === 1);
    }

    const value = node.querySelector('[data-role="output-value"]');
    if (value) {
        value.textContent = gate.inputs[0] ? '1' : '0';
    }

    const toggle = node.querySelector('[data-action="toggle-input"]');
    if (toggle) {
        toggle.textContent = gate.output ? '1' : '0';
        toggle.classList.toggle('active', gate.output === 1);
    }

    const label = node.querySelector('[data-action="set-label"]');
    if (label && gate.label) {
        label.value = gate.label;
    }
}

export function updateWirePath(path, from, to) {
    const dx = Math.max(40, Math.abs(to.x - from.x) * 0.4);
    const c1x = from.x + dx;
    const c2x = to.x - dx;
    path.setAttribute('d', `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`);
}

export function getPinCenter(pin, workspace) {
    const pinRect = pin.getBoundingClientRect();
    const workspaceRect = workspace.getBoundingClientRect();

    return {
        x: pinRect.left - workspaceRect.left + pinRect.width / 2,
        y: pinRect.top - workspaceRect.top + pinRect.height / 2
    };
}
