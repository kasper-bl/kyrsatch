const slider = document.getElementById('playerSlider');
const track = document.getElementById('track');
const handleLeft = document.getElementById('handleLeft');
const handleRight = document.getElementById('handleRight');
const playerRange = document.getElementById('playerRange');


const minVal = parseInt(handleLeft.dataset.min);
const maxVal = parseInt(handleLeft.dataset.max);

let leftValue = 2;
let rightValue = 6;

updateHandles();

function updateHandles() {
    const leftPercent = ((leftValue - minVal) / (maxVal - minVal)) * 100;
    const rightPercent = ((rightValue - minVal) / (maxVal - minVal)) * 100;

    handleLeft.style.left = `${leftPercent}%`;
    handleRight.style.left = `${rightPercent}%`;

    track.style.left = `${leftPercent}%`;
    track.style.width = `${rightPercent - leftPercent}%`;

    playerRange.textContent = `${leftValue}–${rightValue}`;
}


[handleLeft, handleRight].forEach(handle => {
    handle.addEventListener('mousedown', startDrag);
});

function startDrag(e) {
    e.preventDefault();
    const isLeft = e.target.id === 'handleLeft';
    const currentHandle = e.target;

    function dragMove(e) {
        const rect = slider.getBoundingClientRect();
        const pos = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (pos / rect.width) * 100));

        const value = Math.round(minVal + (percent / 100) * (maxVal - minVal));

        if (isLeft) {
            leftValue = Math.min(value, rightValue - 1);
        } else {
            rightValue = Math.max(value, leftValue + 1); 
        }

        updateHandles();
    }

    function stopDrag() {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', stopDrag);
}
