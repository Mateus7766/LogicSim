const gateList = document.getElementById('porta-logicas-listas');

function saveSelectedGate(gateType) {
    if (!gateType) {
        return;
    }

    try {
        sessionStorage.setItem('selectedGate', gateType);
    } catch (error) {
       
    }

    try {
        localStorage.setItem('selectedGate', gateType);
    } catch (error) {
        
    }
}

function handleGateSelect(event) {
    const link = event.target.closest('a[data-gate]');
    if (!link) {
        return;
    }

    saveSelectedGate(link.dataset.gate);
}

if (gateList) {
    gateList.addEventListener('pointerdown', handleGateSelect, { capture: true });
    gateList.addEventListener('click', handleGateSelect);
}
